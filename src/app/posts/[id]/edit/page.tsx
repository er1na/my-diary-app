"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Diary } from "@/types/diary";
import { loadPosts, updatePost } from "@/lib/storage";

// バリデーション
const schema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  content: z.string().min(1, "本文は必須です"),
  date: z.string().min(1, "日付は必須です"),
});

type FormData = z.infer<typeof schema>;

export default function EditDiaryPage() {
  const { id } = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!id) return;
  
    fetch(`/api/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("投稿が見つかりません");
        return res.json();
      })
      .then((data) => {
        reset(data);
      })
      .catch(() => {
        alert("投稿が見つかりませんでした");
        router.push("/");
      });
  }, [id, reset, router]);
  
  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT", // またはPATCH
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (!res.ok) throw new Error("更新に失敗しました");
  
      alert("更新しました！");
      router.push("/");
    } catch (error) {
      alert((error as Error).message);
    }
  };  

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">投稿を編集</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block font-medium">タイトル</label>
          <input
            type="text"
            {...register("title")}
            className="w-full border rounded px-3 py-2"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block font-medium">本文</label>
          <textarea
            {...register("content")}
            className="w-full border rounded px-3 py-2"
            rows={6}
          />
          {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
        </div>
        <div>
          <label className="block font-medium">日付</label>
          <input
            type="date"
            {...register("date")}
            className="w-full border rounded px-3 py-2"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          更新する
        </button>
      </form>
    </main>
  );
}
