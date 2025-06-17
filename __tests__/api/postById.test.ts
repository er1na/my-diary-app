import { GET, PUT, DELETE } from "@/app/api/posts/[id]/route";
import { loadPosts, updatePost, deletePost } from "@/lib/storage";

jest.mock("@/lib/storage", () => ({
  loadPosts: jest.fn(),
  updatePost: jest.fn(),
  deletePost: jest.fn(),
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: (data: any, options?: any) => ({
      json: async () => data,
      status: options?.status || 200,
    }),
  },
}));

describe("GET /api/posts/[id]", () => {
  it("should return the post if found", async () => {
    const mockPost = { id: 1, title: "テスト", content: "内容", date: "2025-06-16" };
    (loadPosts as jest.Mock).mockReturnValue([mockPost]);

    const context = { params: { id: "1" } };

    const response = await GET(new Request(""), context);
    const json = await response.json();

    expect(json).toEqual(mockPost);
  });

  it("should return 404 if post not found", async () => {
    (loadPosts as jest.Mock).mockReturnValue([]);

    const context = { params: { id: "999" } };

    const response = await GET(new Request(""), context);
    const json = await response.json();

    expect(response.status).toBe(404);
    expect(json).toEqual({ message: "投稿が見つかりません" });
  });
});

describe("PUT /api/posts/[id]", () => {
  it("should update the post and return success message", async () => {
    const mockPostUpdate = { title: "更新後", content: "更新内容", date: "2025-06-17" };
    const context = { params: { id: "1" } };

    const mockRequest = new Request("", {
      method: "PUT",
      body: JSON.stringify(mockPostUpdate),
      headers: { "Content-Type": "application/json" },
    });

    const response = await PUT(mockRequest, context);

    expect(updatePost).toHaveBeenCalledWith({ id: 1, ...mockPostUpdate });

    const json = await response.json();
    expect(json).toEqual({ message: "更新成功" });
  });
});

describe("DELETE /api/posts/[id]", () => {
  it("should delete post if exists and return success", async () => {
    (loadPosts as jest.Mock).mockReturnValue([{ id: 1, title: "テスト" }]);
    const context = { params: { id: "1" } };

    const response = await DELETE(new Request(""), context);

    expect(deletePost).toHaveBeenCalledWith(1);

    const json = await response.json();
    expect(json).toEqual({ message: "削除成功" });
  });

  it("should return 404 if post does not exist", async () => {
    (loadPosts as jest.Mock).mockReturnValue([]);
    const context = { params: { id: "999" } };

    const response = await DELETE(new Request(""), context);
    const json = await response.json();

    expect(response.status).toBe(404);
    expect(json).toEqual({ message: "存在しないIDです" });
  });
});
