# 🤖 myLLM - Real-time AI Chat Application

A modern, responsive AI chat application built with Next.js that provides real-time streaming responses from multiple AI providers including Groq, OpenAI, Google AI, and more.

## ✨ Features

- 🚀 **Real-time Streaming**: Character-by-character response streaming like ChatGPT
- 🔄 **Multiple AI Providers**: Automatic fallback between Groq, Google AI, OpenAI, Cohere, and Hugging Face
- 💬 **Intuitive Chat Interface**: Clean, modern UI with message history
- 🎯 **Smart Error Handling**: Graceful degradation when APIs are unavailable
- 🔐 **Secure API Key Management**: Environment-based configuration
- 📱 **Responsive Design**: Works perfectly on desktop and mobile

## 🛠 Tech Stack

- **Framework**: Next.js 15+ with TypeScript
- **AI Integration**: Vercel AI SDK with multiple provider support
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persistence
- **Streaming**: Server-Sent Events (SSE) for real-time responses

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- At least one AI API key (see configuration below)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/CGunasekaran/myLLM.git
cd myLLM
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your API keys in `.env`:
```env
# At least one API key is required
GROQ_API_KEY=your_groq_key_here          # Free & Fast
GOOGLE_API_KEY=your_google_ai_key        # Free tier available
OPENAI_API_KEY=your_openai_key           # Paid
COHERE_API_KEY=your_cohere_key           # Free tier available
ANTHROPIC_API_KEY=your_anthropic_key     # Paid
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) to start chatting!

## 🔑 API Key Setup

### Groq (Recommended - Free & Fast)
1. Visit [console.groq.com](https://console.groq.com/keys)
2. Create a free account
3. Generate an API key
4. Add to `.env` as `GROQ_API_KEY`

### Google AI (Free Tier)
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Enable the Generative Language API in Google Cloud Console
4. Add to `.env` as `GOOGLE_API_KEY`

### OpenAI (Paid)
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an API key
3. Add credits to your account
4. Add to `.env` as `OPENAI_API_KEY`

## 🏗 Project Structure

```
├── app/
│   ├── api/chat/route.ts     # API endpoint with multi-provider fallback
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main chat page
├── components/
│   ├── SimpleChatInterface.tsx  # Main chat component
│   ├── MessageInput.tsx         # Input component
│   └── MessageList.tsx          # Message display
├── lib/
│   └── utils.ts              # Utility functions
└── types/
    └── chat.ts               # TypeScript definitions
```

## 🔄 How It Works

1. **Multi-Provider Fallback**: The app tries AI providers in order (Groq → Google AI → Cohere → Hugging Face → OpenAI)
2. **Real-time Streaming**: Responses stream character-by-character using Server-Sent Events
3. **Automatic Error Handling**: If one provider fails, it automatically tries the next
4. **Message History**: Maintains conversation context across multiple exchanges

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Made with ❤️ by [CGunasekaran](https://github.com/CGunasekaran)
