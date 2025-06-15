import { Diary } from "@/types/diary";

// 一覧取得
export async function fetchPosts(): Promise<Diary[]> {
  const res = await fetch("/api/posts");
  if (!res.ok) throw new Error("投稿の取得に失敗しました");
  return res.json();
}

// 1件取得
export async function fetchPost(id: number): Promise<Diary | null> {
  const res = await fetch(`/api/posts/${id}`);
  if (!res.ok) return null;
  return res.json();
}

// 新規作成
export async function createPost(post: Omit<Diary, "id">): Promise<Diary> {
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error("投稿の作成に失敗しました");
  return res.json();
}

// 更新
export async function updatePost(id: number, post: Omit<Diary, "id">): Promise<void> {
  const res = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error("投稿の更新に失敗しました");
}

// 削除
export async function deletePost(id: number): Promise<void> {
  const res = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("投稿の削除に失敗しました");
}
