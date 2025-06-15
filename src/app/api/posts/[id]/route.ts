import { NextResponse } from "next/server";
import { deletePost, updatePost, loadPosts } from "@/lib/storage";

export async function DELETE(_: Request, context: { params: { id: string } }) {
  const id = Number(context.params.id);
  const posts = loadPosts();

  if (!posts.some((p) => p.id === id)) {
    return NextResponse.json({ message: "存在しないIDです" }, { status: 404 });
  }

  deletePost(id);
  return NextResponse.json({ message: "削除成功" });
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  const id = Number(context.params.id);
  const data = await req.json();

  updatePost({ id, ...data });
  return NextResponse.json({ message: "更新成功" });
}

// GET /api/posts/[id]
export async function GET(_: Request, context: { params: { id: string } }) {
    const id = Number(context.params.id);
    const posts = loadPosts();
    const post = posts.find((p) => p.id === id);
  
    if (!post) {
      return NextResponse.json({ message: "投稿が見つかりません" }, { status: 404 });
    }
  
    return NextResponse.json(post);
}
  
