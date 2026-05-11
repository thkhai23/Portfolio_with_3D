"use client";

import React from "react";

export default function InteractiveAvatar() {
  return (
    <div className="relative flex items-center justify-center py-10">
      {/* Outer Glow & Decoration */}
      <div className="relative w-48 h-48 md:w-56 md:h-56">
        {/* Cyber Neon Rings (Rotating) */}
        <div className="absolute -inset-12 border border-[#00f0ff]/10 rounded-full animate-spin-slow" />
        
        {/* Middle Ring with Marker */}
        <div className="absolute -inset-8 border-2 border-[#00f0ff]/80 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.4)] z-10 animate-spin-slow">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#00f0ff] rounded-full shadow-[0_0_15px_#00f0ff]" />
        </div>

        {/* Inner Ring with Marker (Reverse) */}
        <div className="absolute -inset-4 border border-[#ff00ff]/40 rounded-full animate-spin-slow-reverse">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-[#ff00ff] rounded-full shadow-[0_0_10px_#ff00ff]" />
        </div>

        {/* The Original Image */}
        <div className="w-full h-full rounded-full overflow-hidden relative z-5 border-2 border-black">
          <img 
            src="/images/avatar.jpg" 
            alt="Avatar Phan Thanh Khải" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Background radial glow */}
      <div className="absolute w-80 h-80 bg-[#00f0ff]/15 blur-[100px] rounded-full -z-10" />
    </div>
  );
}
