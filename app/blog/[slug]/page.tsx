import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
      <Link
        href="/blog"
        className="text-[#00f0ff] hover:text-[#ff00ff] font-bold text-sm mb-8 inline-flex items-center gap-2 transition-colors pointer-events-auto"
      >
        <span>&lt;</span> QUAY LẠI KHO LƯU TRỮ
      </Link>

      <article className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl pointer-events-auto">
        <div className="mb-8">
          <div className="flex gap-2 mb-6">
            <Badge className="bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/20">
              {post.category}
            </Badge>
            <span className="text-gray-500 font-mono text-sm">
              {new Date(post.created_at).toLocaleDateString("vi-VN")}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ff00ff]/20 border border-[#ff00ff]/30 flex items-center justify-center text-[#ff00ff] font-bold">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-white font-bold">{post.author}</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Tác giả bài viết</p>
            </div>
          </div>
        </div>

        <div className="text-gray-200 text-lg leading-relaxed mb-12 whitespace-pre-line border-t border-white/5 pt-8">
          {post.content}
        </div>

        <div className="bg-[#00f0ff]/5 border border-[#00f0ff]/20 rounded-2xl p-6 mt-12">
          <p className="text-[#00f0ff] text-sm font-medium italic">
            "Cảm ơn bạn đã đọc bài viết này trong không gian của tôi. Hy vọng những thông tin này hữu ích cho hành trình của bạn!"
          </p>
        </div>
      </article>
    </div>
  );
}
