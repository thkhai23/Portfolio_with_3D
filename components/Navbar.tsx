import Link from "next/link";	
	
export default function Navbar() {	
  return (	
    <nav className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">	
      <div className="max-w-5xl mx-auto px-4 py-4">	
        <div className="flex items-center justify-between">	
          <Link href="/" className="text-xl font-bold text-[#00f0ff] drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">	
            Thanh Khải nè	
          </Link>	
          <div className="flex gap-6">	
            {[
              { href: "/", label: "Trang chủ" },
              { href: "/about", label: "Giới thiệu" },
              { href: "/blog", label: "Blog" },
              { href: "/projects", label: "Dự án" },
              { href: "/guestbook", label: "Lưu bút" },
              { href: "/contact", label: "Liên hệ" },
            ].map((item) => (
              <Link	
                key={item.href}
                href={item.href}	
                className="text-gray-300 hover:text-[#00f0ff] transition-colors"	
              >	
                {item.label}	
              </Link>
            ))}
          </div>	
        </div>	
      </div>	
    </nav>	
  );	
}	
