"use client";

import React from "react";

export default function InteractiveAvatar() {
  return (
    <div className="relative flex items-center justify-center py-10">
      {/* Outer Glow & Decoration */}
      <div className="relative w-48 h-48 md:w-56 md:h-56">
        {/* Cyber Neon Rings (Static) */}
        <div className="absolute -inset-4 border border-[#00f0ff]/20 rounded-full" />
        <div className="absolute -inset-2 border-2 border-[#00f0ff] rounded-full shadow-[0_0_15px_rgba(0,240,255,0.4)] z-10" />
        <div className="absolute -inset-1 border border-[#ff00ff]/30 rounded-full" />

        {/* The Original Image (No color editing) */}
        <div className="w-full h-full rounded-full overflow-hidden relative z-5 border-2 border-black">
          <img 
            src="/images/avatar.jpg" 
            alt="Avatar Phan Thanh Khải" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Static HUD Decoration Elements */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#ff00ff] rounded-tl-sm z-20" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#00f0ff] rounded-br-sm z-20" />
      </div>

      {/* Background radial glow behind the avatar */}
      <div className="absolute w-64 h-64 bg-[#00f0ff]/10 blur-3xl rounded-full -z-10" />
    </div>
  );
}
