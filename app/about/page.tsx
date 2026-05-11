"use client";

import InteractiveAvatar from "@/components/InteractiveAvatar";
import { useLanguage } from "@/lib/language-context";

export default function AboutPage() {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 relative">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="flex-shrink-0">
          <InteractiveAvatar />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-[0_0_10px_#00f0ff]">
            {t("aboutTitle")}
          </h1>
          <p className="text-[#00f0ff] text-xl font-medium">Phan Thanh Khải — CTK46</p>
        </div>
      </div>

      <div className="grid gap-8 pointer-events-auto">
        {/* Intro Section */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.3)] pointer-events-auto">
          <p className="text-gray-200 text-lg leading-relaxed">
            {t("introText")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 pointer-events-auto">
          {/* Skills Section */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 pointer-events-auto">
            <h2 className="text-2xl font-bold text-[#00f0ff] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00f0ff] rounded-full animate-pulse" />
              {t("specializedSkills")}
            </h2>
            <ul className="grid grid-cols-1 gap-3">
              {[
                "JavaScript / TypeScript",
                "React & Next.JS",
                "Tailwind CSS",
                "Git & GitHub",
                "SQL & PostgreSQL"
              ].map(skill => (
                <li key={skill} className="flex items-center gap-3 text-gray-300">
                  <span className="text-[#ff00ff]">▹</span> {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Education Section */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 pointer-events-auto">
            <h2 className="text-2xl font-bold text-[#ff00ff] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#ff00ff] rounded-full animate-pulse" />
              {t("education")}
            </h2>
            <div className="border-l-2 border-[#ff00ff]/30 pl-6 py-2">
              <p className="text-white font-bold text-xl">{t("university")}</p>
              <p className="text-[#00f0ff]">{t("major")}</p>
              <p className="text-gray-400 mt-2">2022 — 2027</p>
            </div>
            <div className="border-l-2 border-[#ff00ff]/30 pl-6 py-2">
              <p className="text-white font-bold text-xl">{t("highschool")}</p>
              <p className="text-[#00f0ff]">{language === "vi" ? "Cấp 3" : "High School"}</p>
              <p className="text-gray-400 mt-2">2019 - 2022</p>
            </div>
            <div className="border-l-2 border-[#ff00ff]/30 pl-6 py-2">
              <p className="text-white font-bold text-xl">{t("secondary")}</p>
              <p className="text-[#00f0ff]">{language === "vi" ? "Cấp 2" : "Secondary School"}</p>
              <p className="text-gray-400 mt-2">2015 - 2019</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
