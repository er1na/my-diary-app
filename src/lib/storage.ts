import { Diary } from "@/types/diary";

const STORAGE_KEY = "diary_posts";

// 投稿一覧を取得
export function loadPosts(): Diary[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

// 投稿を追加して保存
export function savePost(post: Diary) {
  const posts = loadPosts();
  const newPosts = [post, ...posts]; // 新しい投稿を先頭に
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
}

// 投稿を削除
export function deletePost(id: number) {
  const posts = loadPosts();
  const newPosts = posts.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
}
