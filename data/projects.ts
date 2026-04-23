export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Portfolio Không Gian",
    description: "Trang portfolio cá nhân với hiệu ứng 3D và không gian ảo diệu, tích hợp Supabase làm backend.",
    tags: ["Next.js", "Three.js", "Supabase", "Tailwind CSS"],
    github: "https://github.com/thkhai23/Portfolio_with_3D",
    link: "https://github.com/thkhai23/Portfolio_with_3D",
    image: "/images/sun.jpg"
  },
  {
    id: "2",
    title: "Ứng dụng Quản lý Học tập",
    description: "Hệ thống hỗ trợ sinh viên quản lý lộ trình học tập, tài liệu và lịch trình thi cử.",
    tags: ["React", "Node.js", "PostgreSQL"],
    github: "https://github.com",
    image: "/images/world.jpg"
  },
  {
    id: "3",
    title: "Ứng dụng Demo Fullstack kết nối Supabase",
    description: "Hệ thống giúp sinh viên làm quen với fullstack và kết nối data với supabase",
    tags: ["React", "Node.js", "PostgreSQL"],
    github: "https://github.com/thkhai23/Fullstack_with_Supabase",
    image: "/images/FS.jpg"
  },
  {
    id: "4",
    title: "Nền tảng Blog Công nghệ",
    description: "Nơi chia sẻ kiến thức về lập trình và xu hướng công nghệ mới nhất.",
    tags: ["Next.js", "TypeScript", "MDX"],
    github: "https://github.com",
    link: "https://blog.com",
    image: "/images/avatarAI.jpeg"
  },
  {
    id: "5",
    title: "Trang web chúc mừng ngày Quốc tế Phụ nữ 8/3",
    description: "Web giúp chúc mừng ngày Quốc tế Phụ nữ 8/3 với giao diện đẹp mắt và lời chúc ý nghĩa.",
    tags: ["HTML5", "CSS3", "JavaScript", "GSAP", "SweetAlert2"],
    github: "https://github.com/thkhai23/Web8-3",
    link: "https://github.com/thkhai23/Web8-3",
    image: "/images/QTPN.jpg"
  }
];
