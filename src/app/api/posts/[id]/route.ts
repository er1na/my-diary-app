import { NextResponse } from "next/server";
import { deletePost, updatePost, loadPosts } from "@/lib/storage";

// DELETE
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const posts = await loadPosts();

  if (!posts.some((p) => p.id === Number(id))) {
    return NextResponse.json({ message: "存在しないIDです" }, { status: 404 });
  }

  await deletePost(Number(id));
  return NextResponse.json({ message: "削除成功" });
}

// PUT
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await req.json();

  await updatePost({ id: Number(id), ...data });
  return NextResponse.json({ message: "更新成功" });
}

// GET
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const posts = await loadPosts();
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return new Response("Not Found", { status: 404 });
  }

  return Response.json(post);
}
