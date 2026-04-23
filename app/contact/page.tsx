"use client";	
	
import { useActionState } from "react";	
import { sendContactMessage, ContactFormState } from "./actions";	
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
	
const initialState: ContactFormState = {	
  success: false,	
};	
	
export default function ContactPage() {	
  const [state, formAction, isPending] = useActionState(	
    sendContactMessage,	
    initialState	
  );	

  return (	
    <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">	
      <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-[0_0_10px_#00f0ff]">Liên hệ</h1>	
      <p className="text-[#00f0ff] mb-10 font-medium">	
        Bạn có câu hỏi hoặc muốn hợp tác? Hãy gửi tín hiệu cho tôi!	
      </p>	

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pointer-events-auto">	
        {/* Thông tin liên hệ */}	
        <div className="space-y-4">	
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg">	
            <h3 className="font-bold text-[#ff00ff] mb-2 uppercase text-xs tracking-widest">Email</h3>	
            <a	
              href="mailto:2212386@dlu.edu.vn"	
              className="text-white hover:text-[#00f0ff] transition-colors text-sm break-all"	
            >	
              2212386@dlu.edu.vn	
            </a>	
          </div>	
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg">	
            <h3 className="font-bold text-[#ff00ff] mb-2 uppercase text-xs tracking-widest">GitHub</h3>	
            <a	
              href="https://github.com/thkhai23"	
              target="_blank"	
              rel="noopener noreferrer"	
              className="text-white hover:text-[#00f0ff] transition-colors text-sm break-all"	
            >	
              github.com/thkhai23
            </a>	
          </div>	
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg">	
            <h3 className="font-bold text-[#ff00ff] mb-2 uppercase text-xs tracking-widest">Địa chỉ</h3>	
            <p className="text-sm text-gray-300">	
              Đại học Đà Lạt, 01 Phù Đổng Thiên Vương, Đà Lạt	
            </p>	
          </div>	
        </div>	

        {/* Form liên hệ */}	
        <div className="md:col-span-2">	
          {state.success ? (	
            <div className="bg-[#00ff80]/10 backdrop-blur-xl border border-[#00ff80]/20 rounded-2xl p-8 
text-center">	
              <h3 className="text-[#00ff80] font-bold text-xl mb-2">	
                TRUYỀN TẢI THÀNH CÔNG!	
              </h3>	
              <p className="text-gray-200 mb-6">	
                Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi sớm nhất có thể.	
              </p>	
              <Button	
                className="bg-[#00ff80] text-black font-bold hover:bg-[#00cc66]"
                onClick={() => window.location.reload()}	
              >	
                Gửi tin nhắn khác	
              </Button>	
            </div>	
          ) : (	
            <form action={formAction} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-6 shadow-2xl">	
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>	
                  <Label	
                    htmlFor="name"	
                    className="mb-2 block text-[#00f0ff] font-medium"	
                  >	
                    Họ và tên	
                  </Label>	
                  <Input	
                    id="name"	
                    name="name"	
                    type="text"	
                    placeholder="Nguyễn Văn A"	
                    required	
                    className="bg-white/5 border-white/10 text-white focus:ring-[#00f0ff]"
                  />	
                  {state.errors?.name && (	
                    <p className="text-red-500 text-xs mt-1">	
                      {state.errors.name[0]}	
                    </p>	
                  )}	
                </div>	

                <div>	
                  <Label	
                    htmlFor="email"	
                    className="mb-2 block text-[#00f0ff] font-medium"
                     >	
                    Email	
                  </Label>	
                  <Input	
                    id="email"	
                    name="email"	
                    type="email"	
                    placeholder="email@example.com"	
                    required	
                    className="bg-white/5 border-white/10 text-white focus:ring-[#00f0ff]"
                  />	
                  {state.errors?.email && (	
                    <p className="text-red-500 text-xs mt-1">	
                      {state.errors.email[0]}	
                    </p>	
                  )}	
                </div>	
              </div>

              <div>	
                <Label	
                  htmlFor="subject"	
                  className="mb-2 block text-[#00f0ff] font-medium"	
                >	
                  Tiêu đề	
                </Label>	
                <Input	
                  id="subject"	
                  name="subject"	
                  type="text"	
                  placeholder="Chủ đề bạn muốn trao đổi"	
                  required	
                  className="bg-white/5 border-white/10 text-white focus:ring-[#00f0ff]"
                />	
                {state.errors?.subject && (	
                  <p className="text-red-500 text-xs mt-1">	
                    {state.errors.subject[0]}	
                  </p>	
                )}	
              </div>	

              <div>	
                <Label	
                  htmlFor="message"	
                  className="mb-2 block text-[#00f0ff] font-medium"	
                >	
                  Nội dung	
                </Label>	
                <Textarea	
                  id="message"	
                  name="message"	
                  placeholder="Viết nội dung tin nhắn..."	
                  required	
                  rows={5}	
                  className="resize-none bg-white/5 border-white/10 text-white focus:ring-[#00f0ff]"
                />
                {state.errors?.message && (	
                  <p className="text-red-500 text-xs mt-1">	
                    {state.errors.message[0]}	
                  </p>	
                )}	
              </div>	

              <Button type="submit" disabled={isPending} className="w-full py-6 bg-[#00f0ff] text-black font-bold hover:bg-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                {isPending ? "ĐANG TRUYỀN TẢI..." : "GỬI TIN NHẮN"}
              </Button>	
            </form>	
          )}	
        </div>	
      </div>	
    </div>	
  );	
}	
	