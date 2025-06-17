import { savePost, loadPosts } from "./storage";

describe("storage.tsのユニットテスト", () => {
  // テスト用のモックデータ
  const mockPost = {
    id: 123,
    title: "テスト投稿",
    content: "これはテスト用の内容です。",
    date: "2025-06-16",
  };

  beforeEach(() => {
    // localStorageをクリア（テスト前の状態をリセット）
    localStorage.clear();
  });

  test("savePostとloadPostsが連携", () => {
    // 初期状態は空配列
    expect(loadPosts()).toEqual([]);

    // 投稿を保存
    savePost(mockPost);

    // 投稿が保存されているか確認
    const posts = loadPosts();
    expect(posts.length).toBe(1);
    expect(posts[0]).toEqual(mockPost);
  });

  test("savePostは投稿を先頭に追加する", () => {
    // すでに1件ある状態
    savePost({ id: 1, title: "既存投稿", content: "既存", date: "2025-06-15" });
    savePost(mockPost);

    const posts = loadPosts();
    expect(posts[0]).toEqual(mockPost); // 新しい投稿が先頭
    expect(posts[1].id).toBe(1); // 既存投稿は後ろに
  });
});
