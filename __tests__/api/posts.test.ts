// __tests__/api/posts.test.ts
import { POST } from "@/app/api/posts/route";
import { savePost } from "@/lib/storage";

// savePost をモック化
jest.mock("@/lib/storage", () => ({
  savePost: jest.fn(),
}));

// NextResponseをモック化
jest.mock("next/server", () => ({
  NextResponse: {
    json: (data: any) => ({
      json: async () => data,
    }),
  },
}));

describe("POST /api/posts", () => {
  it("should save post and return success message", async () => {
    const mockPost = {
      id: 1,
      title: "テスト投稿",
      content: "これはテストです",
      date: "2025-06-16",
    };

    // モックリクエスト作成
    const mockRequest = new Request("http://localhost/api/posts", {
      method: "POST",
      body: JSON.stringify(mockPost),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(mockRequest);

    expect(savePost).toHaveBeenCalledWith(mockPost);

    const json = await response.json();
    expect(json).toEqual({ message: "保存成功" });
  });
});
