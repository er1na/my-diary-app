// lib/storage.ts
import fs from "fs";
import path from "path";
import { Diary } from "@/types/diary";

const filePath = path.join(process.cwd(), "posts.json");

export function loadPosts(): Diary[] {
  try {
    const jsonData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(jsonData);
  } catch {
    return [];
  }
}

export function savePost(post: Diary): void {
  const posts = loadPosts();
  posts.push(post);
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
}

export function deletePost(id: number): void {
  const posts = loadPosts().filter((p) => p.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
}

export function updatePost(updated: Diary): void {
  const posts = loadPosts().map((p) => (p.id === updated.id ? updated : p));
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
}
