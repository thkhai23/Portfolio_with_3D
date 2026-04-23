"use server";

import { z } from "zod";
import { supabase } from "@/lib/supabase";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(100, "Tên không được quá 100 ký tự"),
  email: z
    .string()
    .email("Email không hợp lệ"),
  subject: z
    .string()
    .min(5, "Tiêu đề phải có ít nhất 5 ký tự")
    .max(200, "Tiêu đề không được quá 200 ký tự"),
  message: z
    .string()
    .min(10, "Nội dung phải có ít nhất 10 ký tự")
    .max(2000, "Nội dung không được quá 2000 ký tự"),
});

export interface ContactFormState {
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
    general?: string[];
  };
}

export async function sendContactMessage(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  };

  const result = contactSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Lưu vào database Supabase
  const { error } = await supabase
    .from('contacts')
    .insert([
      {
        name: result.data.name,
        email: result.data.email,
        subject: result.data.subject,
        message: result.data.message,
      }
    ]);

  if (error) {
    console.error("Lỗi Supabase:", error);
    return {
      success: false,
      errors: { general: ["Không thể gửi tin nhắn. Vui lòng thử lại sau."] },
    };
  }

  console.log("Tin nhắn liên hệ mới đã được lưu vào Supabase:", result.data);

  return { success: true };
}
