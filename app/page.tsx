import Link from "next/link";
import InteractiveAvatar from "@/components/InteractiveAvatar";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 relative">
      {/* Hero section */}
      <div className="text-center mb-16 pointer-events-auto">
        <InteractiveAvatar />

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Hello, mình là{" "}
          <span className="text-[#00f0ff] drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">Thanh Khải</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Sinh viên Công nghệ Thông tin tại Đại học Đà Lạt. Đam mê phát triển
          web và khám phá các công nghệ mới.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/projects"
            className="bg-[#00f0ff] text-black font-bold px-6 py-3 rounded-lg hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]"
          >
            Xem dự án
          </Link>
          <Link
            href="/contact"
            className="border border-[#ff00ff] text-[#ff00ff] px-6 py-3 rounded-lg hover:bg-[#ff00ff10] transition-all shadow-[0_0_10px_rgba(255,0,255,0.2)]"
          >
            Liên hệ
          </Link>
        </div>
      </div>

      {/* Skills section */}
      <div className="mb-16 pointer-events-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-white">Kỹ năng</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "JavaScript",
            "TypeScript",
            "React",
            "Next.JS",
            "Tailwind CSS",
            "Node.js",
            "Git",
            "SQL",
          ].map((skill) => (
            <div
              key={skill}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-[#00f0ff]/10 backdrop-blur-md border border-[#00f0ff]/20 rounded-2xl p-8 text-center pointer-events-auto">
        <h2 className="text-2xl font-bold mb-2 text-white">Đọc Blog của tôi</h2>
        <p className="text-gray-300 mb-4">
          Chia sẻ kiến thức và kinh nghiệm về lập trình, công nghệ
        </p>
        <Link
          href="/blog"
          className="text-[#00f0ff] font-semibold hover:underline"
        >
          Xem blog →
        </Link>
      </div>
    </div>
  );
}
