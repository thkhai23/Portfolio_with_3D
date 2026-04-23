import InteractiveAvatar from "@/components/InteractiveAvatar";

export default function AboutPage() {	
 return (	
    <div className="max-w-5xl mx-auto px-4 py-12 relative">	
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="flex-shrink-0">
          <InteractiveAvatar />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-[0_0_10px_#00f0ff]">
            Giới thiệu về tôi
          </h1>	
          <p className="text-[#00f0ff] text-xl font-medium">Phan Thanh Khải — CTK46</p>
        </div>
      </div>

      <div className="grid gap-8 pointer-events-auto">
        {/* Intro Section */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.3)] pointer-events-auto">
          <p className="text-gray-200 text-lg leading-relaxed">	
            Xin chào! Tôi là <strong className="text-[#ff00ff]">Phan Thanh Khải</strong>, hiện đang là sinh viên năm 3
            ngành Công nghệ Thông tin tại Đại học Đà Lạt. Tôi có niềm đam mê mãnh liệt với việc xây dựng các sản phẩm số sáng tạo và hiệu quả.
          </p>	
        </div>

        <div className="grid md:grid-cols-2 gap-8 pointer-events-auto">
          {/* Skills Section */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 pointer-events-auto">
            <h2 className="text-2xl font-bold text-[#00f0ff] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00f0ff] rounded-full animate-pulse" />
              Kỹ năng chuyên môn
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
              Học vấn
            </h2>	
            <div className="border-l-2 border-[#ff00ff]/30 pl-6 py-2">	
              <p className="text-white font-bold text-xl">Đại học Đà Lạt</p>	
              <p className="text-[#00f0ff]">Kỹ sư Công nghệ Thông tin</p>
              <p className="text-gray-400 mt-2">2022 — 2027</p>	
            </div>	
          </div>
        </div>
      </div>
    </div>
  );	
}	
	