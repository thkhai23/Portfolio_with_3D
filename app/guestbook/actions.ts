"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

// Định nghĩa schema validation cho guestbook
const guestbookSchema = z.object({
  name: z
    .string()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(50, "Tên không được quá 50 ký tự"),
  message: z
    .string()
    .min(1, "Lời nhắn không được để trống")
    .max(500, "Lời nhắn không được quá 500 ký tự"),
});

export interface ActionState {
  success: boolean;
  errors?: {
    name?: string[];
    message?: string[];
    general?: string[];
  };
}

export async function createGuestbookEntry(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const rawData = {
    name: formData.get("name") as string,
    message: formData.get("message") as string,
  };

  const result = guestbookSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase
    .from('guestbook')
    .insert([{ name: result.data.name, message: result.data.message }]);

  if (error) {
    return {
      success: false,
      errors: { general: [error.message] },
    };
  }

  revalidatePath("/guestbook");
  return { success: true };
}

export async function deleteGuestbookEntry(id: string): Promise<ActionState> {
  const { error } = await supabase
    .from('guestbook')
    .delete()
    .eq('id', id);

  if (error) {
    return { success: false, errors: { general: [error.message] } };
  }

  revalidatePath("/guestbook");
  return { success: true };
}
