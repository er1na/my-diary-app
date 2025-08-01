"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Diary } from "@/types/diary";

const schema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  content: z.string().min(1, "本文は必須です"),
  date: z.string().min(1, "日付を選択してください"),
});

type FormData = z.infer<typeof schema>;

export default function NewDiaryPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const newPost: Diary = {
      id: Date.now(),
      ...data,
    };
  
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
  
      if (!res.ok) {
        throw new Error("投稿に失敗しました");
      }
  
      alert("保存しました！");
      reset();
      router.push("/");
  
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">新しい投稿</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block font-medium">タイトル</label>
          <input
            type="text"
            {...register("title")}
            className="w-full border rounded px-3 py-2"
            placeholder="タイトルを入力"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block font-medium">本文</label>
          <textarea
            {...register("content")}
            className="w-full border rounded px-3 py-2"
            rows={6}
            placeholder="本文を入力"
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
          投稿する
        </button>
      </form>
    </main>
  );
}
