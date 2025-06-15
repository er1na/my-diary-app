"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Diary } from "@/types/diary";

export default function DiaryDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Diary | null>(null);

  useEffect(() => {
    if (!id) return;
  
    fetch(`/api/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("投稿が見つかりません");
        return res.json();
      })
      .then((data) => {
        setPost(data);
      })
      .catch(() => {
        setPost(null);
      });
  }, [id]);

  if (!post) {
    return <p className="p-6 text-gray-500">投稿が見つかりませんでした。</p>;
  }

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{post.date}</p>
      <div className="whitespace-pre-wrap text-gray-800 mb-6">{post.content}</div>

      <Link href="/" className="text-blue-600 hover:underline">
        ← 一覧に戻る
      </Link>
    </main>
  );
}
