"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "vi" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  vi: {
    home: "Trang chủ",
    about: "Giới thiệu",
    blog: "Blog",
    projects: "Dự án",
    guestbook: "Lưu bút",
    contact: "Liên hệ",
    hello: "Hello, mình là",
    intro: "Sinh viên Công nghệ Thông tin tại Đại học Đà Lạt. Đam mê phát triển web và khám phá các công nghệ mới.",
    viewProjects: "Xem dự án",
    readBlog: "Đọc Blog của tôi",
    skills: "Kỹ năng",
    blogArchive: "Kho lưu trữ Blog",
    addPost: "+ THÊM BÀI VIẾT",
    cancel: "HỦY LỆNH",
    loading: "Đang tải...",
    noPosts: "Không tìm thấy bản ghi nào.",
    confirmDelete: "Bạn có chắc chắn muốn xóa bài viết này?",
    adminPassword: "Nhập mật khẩu quản trị:",
    aboutTitle: "Giới thiệu về tôi",
    introText: "Xin chào! Tôi là Phan Thanh Khải, hiện đang là sinh viên năm 4 ngành Công nghệ Thông tin tại Đại học Đà Lạt. Tôi có niềm đam mê mãnh liệt với việc xây dựng các sản phẩm số sáng tạo và hiệu quả.",
    specializedSkills: "Kỹ năng chuyên môn",
    education: "Học vấn",
    university: "Đại học Đà Lạt",
    major: "Kỹ sư Công nghệ Thông tin",
    highschool: "Trung học phổ thông Nguyễn Trãi",
    secondary: "THCS Lê Đình Chinh",
  },
  en: {
    home: "Home",
    about: "About",
    blog: "Blog",
    projects: "Projects",
    guestbook: "Guestbook",
    contact: "Contact",
    hello: "Hello, I am",
    intro: "IT Student at Dalat University. Passionate about web development and exploring new technologies.",
    viewProjects: "View Projects",
    readBlog: "Read my Blog",
    skills: "Skills",
    blogArchive: "Blog Archive",
    addPost: "+ ADD POST",
    cancel: "CANCEL",
    loading: "Loading...",
    noPosts: "No posts found.",
    confirmDelete: "Are you sure you want to delete this post?",
    adminPassword: "Enter admin password:",
    aboutTitle: "About Me",
    introText: "Hello! I am Phan Thanh Khải, currently a 4th-year IT student at Dalat University. I have a strong passion for building creative and efficient digital products.",
    specializedSkills: "Specialized Skills",
    education: "Education",
    university: "Dalat University",
    major: "IT Engineer",
    highschool: "Nguyen Trai High School",
    secondary: "Le Dinh Chinh Secondary School",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang) setLanguage(savedLang);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "vi" ? "en" : "vi";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const t = (key: string) => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
