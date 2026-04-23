import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/guestbook — Lấy danh sách tất cả lời nhắn từ Supabase
export async function GET() {
  const { data, error } = await supabase
    .from('guestbook')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("DEBUG: Supabase error in GET:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Map lại format để khớp với giao diện (created_at -> createdAt)
  const entries = data.map(entry => ({
    id: entry.id.toString(),
    name: entry.name,
    message: entry.message,
    createdAt: entry.created_at,
  }));

  return NextResponse.json(entries);
}

// POST /api/guestbook — Thêm lời nhắn mới vào Supabase
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, message } = body;

  // VALIDATION
  if (!name || name.length < 2 || name.length > 50) {
    return NextResponse.json({ error: "Tên phải từ 2 đến 50 ký tự" }, { status: 400 });
  }

  if (!message || message.length < 1 || message.length > 500) {
    return NextResponse.json({ error: "Nội dung phải từ 1 đến 500 ký tự" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('guestbook')
    .insert([{ name, message }])
    .select()
    .single();

  if (error) {
    console.error("DEBUG: Supabase error in POST:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    id: data.id.toString(),
    name: data.name,
    message: data.message,
    createdAt: data.created_at,
  }, { status: 201 });
}
