"use client";

import { ExternalLink, Code2, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 px-6 py-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
            <Code2 className="w-4 h-4" />
            <span>
              © {currentYear} Guna&apos;s LLM Hub. All rights reserved.
            </span>
          </div>

          {/* Portfolio Link */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Built with
            </span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              by
            </span>
            <a
              href="https://gunasekaran-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-1 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors duration-200"
            >
              <span>Gunasekaran</span>
              <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
