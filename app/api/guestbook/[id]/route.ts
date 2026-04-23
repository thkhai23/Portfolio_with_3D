import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// DELETE /api/guestbook/[id] — Xóa lời nhắn theo id từ Supabase
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  const { data, error } = await supabase
    .from('guestbook')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}
