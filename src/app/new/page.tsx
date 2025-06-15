"use client";

import { useState } from "react";

export default function NewDiaryPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(), // 一時的なID
      title,
      content,
      date,
    }

    setTitle("");
    setContent("");
    setDate("");
  };

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">新しい投稿</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium">タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="タイトルを入力"
          />
        </div>
        <div>
          <label className="block font-medium">本文</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={6}
            placeholder="本文を入力"
          />
        </div>
        <div>
          <label className="block font-medium">日付</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          投稿する
        </button>
      </form>
    </main>
  );
}
