"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { createPostAction, deletePostAction } from "./actions";
import { Trash2 } from "lucide-react";

const CATEGORIES = ["Tất cả", "Công nghệ", "Học tập", "Cá nhân", "Cuộc sống"];

import { useLanguage } from "@/lib/language-context";

export default function BlogPage() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const postsPerPage = 6;

  // State for Create Post Form
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newCategory, setNewCategory] = useState("Công nghệ");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  }

  // Filter posts based on category
  const filteredPosts = selectedCategory === "Tất cả" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      alert("Vui lòng điền đầy đủ tiêu đề và nội dung!");
      return;
    }
    
    if (!password.trim()) {
      alert("Vui lòng nhập mật khẩu quản trị!");
      return;
    }
    
    setIsSubmitting(true);
    
    const result = await createPostAction({
      title: newTitle,
      content: newContent,
      excerpt: newExcerpt,
      category: newCategory
    }, password);

    if (!result.success) {
      alert(result.message);
    } else {
      alert(result.message);
      setNewTitle("");
      setNewContent("");
      setNewExcerpt("");
      setPassword("");
      setShowForm(false);
      fetchPosts(); // Refresh danh sách
    }
    
    setIsSubmitting(false);
  };

  const handleDeletePost = async (e: React.MouseEvent, postId: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Convert to number if the string is numeric (to match DB integer types)
    const targetId = isNaN(postId) ? postId : Number(postId);
    console.log("Attempting to delete post ID:", targetId, "Type:", typeof targetId);
    
    const passwordInput = prompt(t("adminPassword"));
    if (!passwordInput) return;
    
    if (confirm(t("confirmDelete"))) {
      try {
        const result = await deletePostAction(targetId, passwordInput);
        console.log("Delete result:", result);
        if (result.success) {
          alert(result.message);
          fetchPosts();
        } else {
          alert(result.message);
        }
      } catch (err) {
        console.error("Delete error:", err);
        alert("An error occurred while deleting the post.");
      }
    }
  };
	
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_10px_#00f0ff]">{t("blogArchive")}</h1>
          <p className="text-[#00f0ff] mt-2 font-medium">
            {loading ? t("loading") : `System found ${filteredPosts.length} reports [${selectedCategory}]`}
          </p>
        </div>
        
        <button 
          onClick={() => setShowForm(!showForm)}
          className="pointer-events-auto bg-[#ff00ff] text-white font-bold px-6 py-3 rounded-xl hover:bg-magenta-500 shadow-[0_0_15px_rgba(255,0,255,0.4)] transition-all"
        >
          {showForm ? t("cancel") : t("addPost")}
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-10 pointer-events-auto">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full border text-sm font-bold transition-all ${
              selectedCategory === cat 
                ? "bg-[#00f0ff] border-[#00f0ff] text-black shadow-[0_0_15px_#00f0ff]" 
                : "bg-white/5 border-white/10 text-gray-400 hover:border-[#00f0ff]/50 hover:text-white"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {showForm && (
        <form 
          onSubmit={handleAddPost}
          className="bg-white/5 backdrop-blur-xl border border-[#ff00ff]/30 rounded-2xl p-8 mb-12 pointer-events-auto shadow-[0_0_30px_rgba(255,0,255,0.1)] space-y-4"
        >
          <h2 className="text-[#ff00ff] font-bold uppercase tracking-widest text-sm mb-4">Tạo bản ghi mới</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Tiêu đề bài viết..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#ff00ff] outline-none"
            />
            <select 
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#ff00ff] outline-none appearance-none cursor-pointer"
            >
              {CATEGORIES.filter(c => c !== "Tất cả").map(cat => (
                <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
              ))}
            </select>
          </div>

          <input 
            type="text" 
            placeholder="Tóm tắt ngắn (excerpt)..."
            value={newExcerpt}
            onChange={(e) => setNewExcerpt(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#ff00ff] outline-none"
          />

          <textarea 
            placeholder="Nội dung chi tiết (hỗ trợ văn bản dài)..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={6}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#ff00ff] outline-none resize-none"
          />

          <div className="relative">
            <input 
              type="password" 
              placeholder="Nhập mật khẩu quản trị để xác thực..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-[#ff00ff]/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#ff00ff] outline-none placeholder:text-gray-500"
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white/10 border border-[#ff00ff] text-[#ff00ff] font-bold py-3 rounded-xl hover:bg-[#ff00ff] hover:text-white transition-all disabled:opacity-50"
          >
            {isSubmitting ? "ĐANG LƯU TRỮ..." : "XÁC NHẬN ĐĂNG TẢI"}
          </button>
        </form>
      )}
	
      <div className="space-y-6 pointer-events-auto">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#00f0ff] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredPosts.length > 0 ? (
          currentPosts.map((post) => (
            <div key={post.id} className="relative group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#ff00ff]/50 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-[#ff00ff]/20 text-[#ff00ff] border-[#ff00ff]/30">{post.author}</Badge>
                      <Badge className="bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/20 font-mono text-[10px]">
                        {post.category}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">
                      {new Date(post.created_at).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#00f0ff] transition-colors capitalize mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 line-clamp-2 italic">
                    "{post.excerpt}"
                  </p>
                </div>
              </Link>
              
              <button 
                onClick={(e) => handleDeletePost(e, post.id)}
                className="absolute top-4 right-4 p-2 bg-red-500/20 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white z-30 pointer-events-auto"
                title="Xóa bài viết"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
            <p className="text-gray-500">Không tìm thấy bản ghi nào trong danh mục này.</p>
          </div>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mt-12 pointer-events-auto">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30"
          >
            &lt;
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                currentPage === i + 1 
                  ? "bg-[#00f0ff] border-[#00f0ff] text-black font-bold shadow-[0_0_15px_#00f0ff]" 
                  : "bg-white/5 border-white/10 text-white hover:bg-white/10"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
