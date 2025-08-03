"use client";

import { useState } from "react";
import { FileText, BarChart3, Type, BookOpen } from "lucide-react";

export default function TextAnalyzer() {
  const [text, setText] = useState("");

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const sentenceCount = text.split(/[.!?]+/).filter((s) => s.trim() !== "").length;
  const paragraphCount = text.split(/\n\s*\n/).filter((p) => p.trim() !== "").length;
  const averageWordsPerSentence = sentenceCount > 0 ? Math.round(wordCount / sentenceCount) : 0;
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute

  const stats = [
    {
      label: "Characters",
      value: characters.toLocaleString(),
      icon: Type,
      description: "Including spaces",
      color: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      label: "Characters (no spaces)",
      value: charactersNoSpaces.toLocaleString(),
      icon: Type,
      description: "Excluding spaces",
      color: "bg-indigo-50 text-indigo-700 border-indigo-200"
    },
    {
      label: "Words",
      value: wordCount.toLocaleString(),
      icon: FileText,
      description: "Total word count",
      color: "bg-green-50 text-green-700 border-green-200"
    },
    {
      label: "Sentences",
      value: sentenceCount.toLocaleString(),
      icon: BarChart3,
      description: "Complete sentences",
      color: "bg-purple-50 text-purple-700 border-purple-200"
    },
    {
      label: "Paragraphs",
      value: paragraphCount.toLocaleString(),
      icon: BookOpen,
      description: "Text paragraphs",
      color: "bg-orange-50 text-orange-700 border-orange-200"
    },
    {
      label: "Avg Words/Sentence",
      value: averageWordsPerSentence.toString(),
      icon: BarChart3,
      description: "Average sentence length",
      color: "bg-teal-50 text-teal-700 border-teal-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Text Analyzer</h1>
          <p className="text-gray-600 text-lg">Analyze your text for detailed insights and statistics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Text Input Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Type className="w-5 h-5 mr-2" />
                  Enter Your Text
                </h2>
              </div>
              <div className="p-6">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Start typing or paste your text here to analyze..."
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 leading-relaxed"
                  style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace' }}
                />
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>Real-time analysis</span>
                  {readingTime > 0 && (
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      ~{readingTime} min read
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Statistics
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className={`p-4 rounded-lg border-2 ${stat.color} transition-all duration-200 hover:shadow-md`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <stat.icon className="w-4 h-4 mr-2" />
                          <span className="font-medium text-sm">{stat.label}</span>
                        </div>
                        <div className="text-2xl font-bold mb-1">{stat.value}</div>
                        <div className="text-xs opacity-75">{stat.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            {text.length > 0 && (
              <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Insights</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Most common word length:</span>
                    <span className="font-medium">
                      {wordCount > 0 ? Math.round(charactersNoSpaces / wordCount) : 0} chars
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Text density:</span>
                    <span className="font-medium">
                      {text.length > 0 ? Math.round((charactersNoSpaces / characters) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Complexity score:</span>
                    <span className="font-medium">
                      {averageWordsPerSentence < 15 ? "Simple" : averageWordsPerSentence < 25 ? "Moderate" : "Complex"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        {text.length === 0 && (
          <div className="mt-12 text-center">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Ready to analyze your text</h3>
              <p className="text-gray-500">Enter some text in the textarea above to see detailed statistics and insights.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}