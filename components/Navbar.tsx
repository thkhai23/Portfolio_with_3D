"use client";

import Link from "next/link";	
import { useLanguage } from "@/lib/language-context";
import { Globe } from "lucide-react";

export default function Navbar() {	
  const { language, toggleLanguage, t } = useLanguage();

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/blog", label: t("blog") },
    { href: "/projects", label: t("projects") },
    { href: "/guestbook", label: t("guestbook") },
    { href: "/contact", label: t("contact") },
  ];

  return (	
    <nav className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">	
      <div className="max-w-5xl mx-auto px-4 py-0">	
        <div className="flex items-center justify-between h-16">	
          <Link href="/" className="relative h-full flex items-center group">
            {/* Subtle background glow for the logo */}
            <div className="absolute inset-0 bg-[#00f0ff]/10 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <img 
              src="/images/image-Photoroom.png" 
              alt="Logo Thanh Khải" 
              className="h-24 md:h-32 w-auto object-contain animate-pulse-glow hover:scale-110 transition-transform duration-300 relative z-10 translate-y-2 md:translate-y-4"
            />
          </Link>
          
          <div className="flex items-center gap-6">	
            <div className="hidden md:flex gap-6">	
              {navItems.map((item) => (
                <Link	
                  key={item.href}
                  href={item.href}	
                  className="text-gray-300 hover:text-[#00f0ff] transition-colors font-medium"	
                >	
                  {item.label}	
                </Link>
              ))}
            </div>	

            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all text-sm font-bold"
              title={language === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
            >
              <Globe size={16} />
              <span>{language === "vi" ? "VI" : "EN"}</span>
            </button>
          </div>
        </div>	
      </div>	
    </nav>	
  );	
}	
