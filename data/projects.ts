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
    link: "https://demo.com",
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
    title: "Nền tảng Blog Công nghệ",
    description: "Nơi chia sẻ kiến thức về lập trình và xu hướng công nghệ mới nhất.",
    tags: ["Next.js", "TypeScript", "MDX"],
    github: "https://github.com",
    link: "https://blog.com",
    image: "/images/avatarAI.jpeg"
  }
];
