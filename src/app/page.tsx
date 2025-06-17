"use client";

import { useEffect, useState } from "react";
import { Diary } from "@/types/diary";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState<Diary[]>([]);

  // 投稿一覧を取得
  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 投稿削除
  const handleDelete = async (id: number) => {
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    fetchPosts();
  };

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">投稿一覧</h1>
      <Link href="/new" className="inline-block mb-6 text-blue-600 hover:underline" data-testid="new-post-link">
        新規投稿
      </Link>

      {posts.length === 0 ? (
        <p className="text-gray-500">まだ投稿がありません。</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  <Link
                    href={`/posts/${post.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {post.title}
                  </Link>
                </h2>
                <span className="text-sm text-gray-400">{post.date}</span>
              </div>
              <p className="mt-2 text-gray-700 whitespace-pre-wrap">{post.content}</p>
              <div className="flex justify-end">
                <Link
                  href={`/posts/${post.id}/edit`}
                  className="text-sm text-blue-600 hover:underline ml-4"
                >
                  編集
                </Link>
              </div>
              <button
                onClick={() => handleDelete(post.id)}
                className="mt-3 text-sm text-red-600 hover:underline"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
