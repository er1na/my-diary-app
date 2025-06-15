// src/lib/storage.ts
import { Diary } from "@/types/diary";

const STORAGE_KEY = "diary_posts";

export function loadPosts(): Diary[] {
  if (typeof window === "undefined") sreturn [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function savePost(post: Diary) {
  const posts = loadPosts();
  const newPosts = [post, ...posts]; // 新しい投稿を先頭に
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
}

export function deletePost(id: number) {
  const posts = loadPosts();
  const newPosts = posts.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
}
