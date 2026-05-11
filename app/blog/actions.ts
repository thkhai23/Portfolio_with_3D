"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export interface PostData {
  title: string;
  content: string;
  excerpt: string;
  category: string;
}

export async function createPostAction(data: PostData, passwordInput: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (passwordInput !== adminPassword) {
    return { success: false, message: "Mật khẩu quản trị không chính xác!" };
  }

  // Logic tạo slug tương tự như bản cũ
  const slugBase = data.title.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
  
  const finalSlug = `${slugBase}-${Date.now()}`;

  const { error } = await supabase
    .from('posts')
    .insert([{
      title: data.title,
      content: data.content,
      excerpt: data.excerpt || data.content.substring(0, 100) + "...",
      category: data.category,
      slug: finalSlug,
      author: "Phan Thanh Khải"
    }]);

  if (error) {
    return { success: false, message: "Lỗi hệ thống: " + error.message };
  }

  revalidatePath("/blog");
  return { success: true, message: "Bài viết đã được đăng tải thành công!" };
}

export async function deletePostAction(postId: any, passwordInput: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (passwordInput !== adminPassword) {
    return { success: false, message: "Mật khẩu quản trị không chính xác!" };
  }

  const { data, error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId)
    .select();

  if (error) {
    console.error("Supabase delete error details:", error);
    return { success: false, message: "Lỗi hệ thống: " + error.message + " (Code: " + error.code + ")" };
  }

  if (!data || data.length === 0) {
    console.log("Delete attempt failed: No rows matched for ID", postId);
    return { success: false, message: "Không tìm thấy bài viết hoặc ID không khớp! (ID: " + postId + ")" };
  }

  revalidatePath("/blog");
  return { success: true, message: "Bài viết đã được xóa thành công!" };
}
