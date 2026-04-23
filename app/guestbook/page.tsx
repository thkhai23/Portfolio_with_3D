"use client";	
	
import { useState } from "react";	
import useSWR from "swr";	
import { GuestbookEntry } from "@/data/guestbook";	
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
	
const fetcher = (url: string) => fetch(url).then((res) => res.json());	
	
export default function GuestbookPage() {	
  const { data: entries = [], error, isLoading, mutate } = useSWR(	
    "/api/guestbook",	
    fetcher	
  );	
	
  // State cho form	
  const [name, setName] = useState("");	
  const [message, setMessage] = useState("");	
  const [submitting, setSubmitting] = useState(false);	
	
  // State cho phân trang	
  const [currentPage, setCurrentPage] = useState(1);	
  const itemsPerPage = 5;	
	
  // State theo dõi ID đang xóa	
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());	
	
  // Tính toán phân trang	
  const totalPages = Math.ceil(entries.length / itemsPerPage);	
  const startIndex = (currentPage - 1) * itemsPerPage;	
  const paginatedEntries = entries.slice(startIndex, startIndex + itemsPerPage);	
	
  // Xử lý gửi lời nhắn mới	
  async function handleSubmit(e: React.FormEvent) {	
    e.preventDefault();	
	
    if (!name.trim() || !message.trim()) return;	
	
    setSubmitting(true);	
    try {	
      const res = await fetch("/api/guestbook", {	
        method: "POST",	
        headers: { "Content-Type": "application/json" },	
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),	
      });	
	
      if (!res.ok) throw new Error("Lỗi khi gửi lời nhắn");	
	
      setName("");	
      setMessage("");	
      setCurrentPage(1);	
      await mutate();	
    } catch (err) {	
      alert("Không thể gửi lời nhắn. Vui lòng thử lại.");	
    } finally {	
      setSubmitting(false);	
    }	
  }	
	
  // Xử lý xóa lời nhắn	
  async function handleDelete(id: string) {	
    setDeletingIds((prev) => new Set(prev).add(id));	
    try {	
      const res = await fetch(`/api/guestbook/${id}`, {	
        method: "DELETE",	
      });	
	
      if (!res.ok) throw new Error("Lỗi khi xóa");	
	
      await mutate();	
    } catch (err) {	
      alert("Không thể xóa lời nhắn. Vui lòng thử lại.");	
    } finally {	
      setDeletingIds((prev) => {	
        const newSet = new Set(prev);	
        newSet.delete(id);	
        return newSet;	
      });	
    }	
  }	
	
  return (	
    <div className="max-w-3xl mx-auto px-4 py-12 relative z-10">	
      <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-[0_0_10px_#00f0ff]">Sổ lưu bút</h1>	
      <p className="text-[#ff00ff] mb-8 font-medium">	
        Hãy để lại dấu ấn của bạn trong không gian của tôi!	
      </p>	
	
      {/* Form gửi lời nhắn */}	
      <form	
        onSubmit={handleSubmit}	
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-10 space-y-4 pointer-events-auto shadow-[0_0_30px_rgba(0,0,0,0.4)]"	
      >	
        <div>	
          <label	
            htmlFor="name"	
            className="block text-sm font-medium text-[#00f0ff] mb-2"	
          >	
            Định danh (Tên của bạn)	
          </label>	
          <input	
            id="name"	
            type="text"	
            value={name}	
            onChange={(e) => setName(e.target.value)}	
            placeholder="Nhập tên..."	
            required	
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none 
focus:ring-2 focus:ring-[#00f0ff] text-white placeholder-gray-500"	
          />	
        </div>	
	
        <div>	
          <label	
            htmlFor="message"	
            className="block text-sm font-medium text-[#00f0ff] mb-2"	
          >	
            Thông điệp	
          </label>	
          <textarea	
            id="message"	
            value={message}	
            onChange={(e) => setMessage(e.target.value)}	
            placeholder="Viết lời nhắn..."	
            required	
            rows={3}	
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none 
focus:ring-2 focus:ring-[#00f0ff] text-white placeholder-gray-500 resize-none"	
          />	
        </div>	
	
        <button	
          type="submit"	
          disabled={submitting || !name.trim() || !message.trim()}	
          className="w-full bg-[#00f0ff] text-black font-bold px-6 py-3 rounded-xl hover:bg-cyan-400 
transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"	
        >	
          {submitting ? "Đang truyền tải dữ liệu..." : "Gửi lời nhắn"}	
        </button>	
      </form>	
	
      {/* Danh sách lời nhắn */}	
      {isLoading && (	
        <div className="text-center py-8 text-[#00f0ff] animate-pulse">	
          Đang nạp dữ liệu từ vũ trụ...	
        </div>	
      )}	
	
      {error && (	
        <div className="text-center py-8 text-red-500">Hệ thống gặp sự cố tải dữ liệu</div>	
      )}	
	
      {!isLoading && !error && (	
        <div className="space-y-6 pointer-events-auto">	
          <p className="text-sm text-gray-400 font-mono">	
            &gt; {entries.length} RECORDS_FOUND (PAGE {currentPage}/{totalPages})	
          </p>	
	
          {paginatedEntries.map((entry) => (	
            <div	
              key={entry.id}	
              className="bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-5 hover:border-white/20 transition-all"	
            >	
              <div className="flex items-center justify-between mb-4">	
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ff00ff]/20 border border-[#ff00ff]/30 flex items-center justify-center text-[#ff00ff] font-bold">
                    {entry.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-bold text-white">	
                    {entry.name}	
                  </span>	
                </div>
                <div className="flex items-center gap-4">	
                  <span className="text-[10px] text-gray-500 font-mono uppercase">	
                    {new Date(entry.createdAt).toLocaleDateString("vi-VN")}	
                  </span>	
                  <Dialog>
                    <DialogTrigger asChild>
                      <button	
                        disabled={deletingIds.has(entry.id)}	
                        className="text-xs text-gray-500 hover:text-red-500 transition-colors"	
                      >	
                        XÓA
                      </button>	
                    </DialogTrigger>
                    <DialogContent className="bg-black border border-white/10 text-white">
                      <DialogHeader>
                        <DialogTitle className="text-white">Xác nhận xóa</DialogTitle>
                        <DialogDescription className="text-gray-400">
                          Thao tác này sẽ xóa vĩnh viễn dữ liệu khỏi không gian lưu trữ.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="gap-2">
                        <DialogClose asChild>
                          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">HỦY</button>
                        </DialogClose>
                        <DialogClose asChild>
                          <button 
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" 
                            onClick={() => handleDelete(entry.id)}
                          >
                            XÁC NHẬN
                          </button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>	
              </div>	
              <p className="text-gray-300 italic leading-relaxed">"{entry.message}"</p>	
            </div>	
          ))}	
	
          {entries.length === 0 && (	
            <p className="text-center text-gray-400 py-8">	
              Chưa có lời nhắn nào. Hãy là người đầu tiên!	
            </p>	
          )}	
	
          {/* Phân trang */}	
          {totalPages > 1 && (	
            <div className="flex justify-between items-center mt-8 pt-6 border-t">	
              <button	
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}	
                disabled={currentPage === 1}	
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"	
              >	
                Trang trước	
              </button>	
	
              <span className="text-sm text-gray-600">	
                Trang {currentPage} / {totalPages}	
              </span>	
	
              <button	
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}	
                disabled={currentPage === totalPages}	
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"	
              >	
                Trang sau	
              </button>	
            </div>	
          )}	
        </div>	
      )}	
    </div>	
  );	
}	