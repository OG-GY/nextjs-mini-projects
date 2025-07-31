"use client";

import { useState } from "react";


function Counter() {
  const [value, setValue] = useState(0);

  const addValue = () => {
    setValue(value + 1);
  };

  const subtractValue = () => {
    setValue(value - 1);
  };

  const reset = () => {
    setValue(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="relative">
        {/* Decorative background circles */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-gradient-to-r from-green-200/30 to-blue-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        
        {/* Main container */}
        <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl shadow-blue-100/50 p-12 border border-white/50">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-slate-700 mb-3 tracking-wide">
              Peaceful Counter
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 mx-auto rounded-full"></div>
          </div>

          {/* Counter display */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 shadow-inner border-2 border-blue-100/50 mb-6">
              <span className="text-5xl font-light text-slate-600 transition-all duration-500 ease-out transform hover:scale-110">
                {value}
              </span>
            </div>
            <p className="text-slate-500 text-sm font-light tracking-wider">
              Current Value
            </p>
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={subtractValue}
              className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 hover:from-rose-200 hover:to-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 border border-rose-200/50"
            >
              <span className="text-2xl text-rose-600 font-light group-hover:text-rose-700 transition-colors duration-200">
                −
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>

            <button
              onClick={reset}
              className="group relative px-6 py-3 rounded-full bg-gradient-to-br from-slate-100 to-gray-100 hover:from-slate-200 hover:to-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 border border-slate-200/50"
            >
              <span className="text-sm text-slate-600 font-medium group-hover:text-slate-700 transition-colors duration-200 tracking-wide">
                Reset
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>

            <button
              onClick={addValue}
              className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 hover:from-emerald-200 hover:to-green-200 shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 border border-emerald-200/50"
            >
              <span className="text-2xl text-emerald-600 font-light group-hover:text-emerald-700 transition-colors duration-200">
                +
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          </div>

          {/* Subtle decorative elements */}
          <div className="flex justify-center mt-8 gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-200 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-purple-200 animate-pulse delay-300"></div>
            <div className="w-2 h-2 rounded-full bg-green-200 animate-pulse delay-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return <Counter />;
}