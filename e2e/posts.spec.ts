import { test, expect } from "@playwright/test";

test("投稿作成から一覧表示まで", async ({ page }) => {
  await page.goto("http://localhost:3002/new");
  await page.waitForLoadState('networkidle');

  // フォームに入力
  await page.waitForSelector('input[type="text"]', { state: 'visible', timeout: 60000 });
  await page.fill('input[type="text"]', 'E2Eテスト投稿');
  await page.fill('textarea', 'E2Eテスト内容');
  await page.fill('input[type="date"]', '2025-06-16');

  // 投稿ボタンをクリック
  await page.click('button[type="submit"]');
  await page.waitForLoadState('networkidle');

  // トップページに戻り、投稿が表示されていることを確認
  const postTitle = page.locator('h2.text-lg.font-semibold').filter({ hasText: 'E2Eテスト投稿' }).first();
  const postContent = page.locator('p.text-gray-700').filter({ hasText: 'E2Eテスト内容' }).first();
  
  await expect(postTitle).toBeVisible();
  await expect(postContent).toBeVisible();
});
