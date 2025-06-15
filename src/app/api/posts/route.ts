import { NextResponse } from "next/server";
import { loadPosts, savePost } from "@/lib/storage";

export async function GET() {
  const posts = loadPosts();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const data = await req.json();
  savePost(data);
  return NextResponse.json({ message: "保存成功" });
}
