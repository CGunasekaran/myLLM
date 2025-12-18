export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    console.log("Received messages:", messages);

    // Try multiple free AI APIs in sequence
    let aiResponse = null;

    // 1. Try Groq (Free and fast)
    console.log(
      "Checking Groq API key:",
      process.env.GROQ_API_KEY ? "Present" : "Missing"
    );
    if (process.env.GROQ_API_KEY) {
      try {
        console.log("Attempting Groq API call...");
        aiResponse = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            },
            body: JSON.stringify({
              model: "llama-3.1-8b-instant",
              messages,
              stream: true,
              temperature: 0.7,
              max_tokens: 1000,
            }),
          }
        );
        console.log("Groq response status:", aiResponse.status);
        if (aiResponse.ok) {
          console.log("✅ Using Groq API successfully");
          return new Response(aiResponse.body, {
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            },
          });
        } else {
          const errorText = await aiResponse.text();
          console.log("❌ Groq API error:", aiResponse.status, errorText);
        }
      } catch (e) {
        console.log("❌ Groq fetch failed:", e instanceof Error ? e.message : String(e));
      }
    } else {
      console.log("⚠️ No Groq API key found");
    }

    // 2. Try Google AI (You have a valid key)
    console.log(
      "Checking Google AI key:",
      process.env.GOOGLE_API_KEY ? "Present" : "Missing"
    );
    if (process.env.GOOGLE_API_KEY) {
      try {
        console.log("Attempting Google AI API call...");
        const googleResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GOOGLE_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: messages[messages.length - 1].content,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
              },
            }),
          }
        );
        console.log("Google AI response status:", googleResponse.status);
        if (googleResponse.ok) {
          console.log("✅ Using Google AI API successfully");
          const result = await googleResponse.json();
          const responseText =
            result.candidates?.[0]?.content?.parts?.[0]?.text ||
            "I'm here to help!";

          // Convert to streaming format
          const stream = new ReadableStream({
            start(controller) {
              let i = 0;
              const interval = setInterval(() => {
                if (i < responseText.length) {
                  const chunk = `data: {"choices":[{"delta":{"content":"${responseText[i]}"}}]}\n\n`;
                  controller.enqueue(new TextEncoder().encode(chunk));
                  i++;
                } else {
                  controller.enqueue(
                    new TextEncoder().encode(`data: [DONE]\n\n`)
                  );
                  controller.close();
                  clearInterval(interval);
                }
              }, 30);
            },
          });

          return new Response(stream, {
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            },
          });
        } else {
          const errorText = await googleResponse.text();
          console.log("❌ Google AI error:", googleResponse.status, errorText);
        }
      } catch (e) {
        console.log("❌ Google AI failed:", e instanceof Error ? e.message : String(e));
      }
    }

    // 3. Try Cohere (Free tier available)
    if (process.env.COHERE_API_KEY) {
      try {
        const cohereResponse = await fetch("https://api.cohere.ai/v1/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          },
          body: JSON.stringify({
            model: "command-light",
            message: messages[messages.length - 1].content,
            chat_history: messages.slice(0, -1),
            stream: true,
          }),
        });
        if (cohereResponse.ok) {
          console.log("Using Cohere API");
          return new Response(cohereResponse.body, {
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            },
          });
        }
      } catch (e) {
        console.log("Cohere failed, trying next API...", e instanceof Error ? e.message : String(e));
      }
    }

    // 3. Try Hugging Face Inference API (Free)
    try {
      const lastMessage = messages[messages.length - 1];
      const hfResponse = await fetch(
        "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: lastMessage.content,
            parameters: {
              max_new_tokens: 500,
              temperature: 0.7,
              return_full_text: false,
            },
          }),
        }
      );

      if (hfResponse.ok) {
        console.log("Using Hugging Face API");
        const hfResult = await hfResponse.json();
        const responseText = Array.isArray(hfResult)
          ? hfResult[0]?.generated_text
          : hfResult.generated_text;

        if (responseText) {
          // Convert to streaming format
          const stream = new ReadableStream({
            start(controller) {
              let i = 0;
              const interval = setInterval(() => {
                if (i < responseText.length) {
                  const chunk = `data: {"choices":[{"delta":{"content":"${responseText[i]}"}}]}\n\n`;
                  controller.enqueue(new TextEncoder().encode(chunk));
                  i++;
                } else {
                  controller.enqueue(
                    new TextEncoder().encode(`data: [DONE]\n\n`)
                  );
                  controller.close();
                  clearInterval(interval);
                }
              }, 30);
            },
          });

          return new Response(stream, {
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            },
          });
        }
      }
    } catch (e) {
      console.log("Hugging Face failed, trying next API...", e instanceof Error ? e.message : String(e));
    }

    // 4. Try OpenAI (if user has credits)
    if (process.env.OPENAI_API_KEY) {
      try {
        const openaiResponse = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages,
              stream: true,
              temperature: 0.7,
              max_tokens: 1000,
            }),
          }
        );

        if (openaiResponse.ok) {
          console.log("Using OpenAI API");
          return new Response(openaiResponse.body, {
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            },
          });
        }
      } catch (e) {
        console.log("OpenAI failed", e instanceof Error ? e.message : String(e));
      }
    }

    // No more fallbacks - only real AI responses

    // If all APIs fail, return error
    throw new Error(
      "All AI APIs are currently unavailable. Please try again later."
    );
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({
        error:
          "All AI services are temporarily unavailable. Please check your API keys or try again later.",
      }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
