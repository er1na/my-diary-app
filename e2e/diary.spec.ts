import { test, expect } from '@playwright/test';

test('日記の投稿と表示', async ({ page }) => {
  // トップページにアクセス
  await page.goto('/');
  console.log('トップページにアクセスしました');
  await page.waitForLoadState('networkidle');
  
  // 新規投稿ページへ移動
  console.log('新規投稿リンクを探しています...');
  const newPostLink = await page.waitForSelector('[data-testid="new-post-link"]', { state: 'visible', timeout: 60000 });
  console.log('新規投稿リンクが見つかりました');
  await newPostLink.click();
  console.log('新規投稿リンクをクリックしました');
  await page.waitForLoadState('networkidle');
  
  // 現在のURLを確認
  const currentUrl = page.url();
  console.log('現在のURL:', currentUrl);
  
  // フォームに入力
  console.log('フォームを探しています...');
  const form = await page.waitForSelector('form', { state: 'visible', timeout: 60000 });
  console.log('フォームが見つかりました');
  
  // フォームの内容を確認
  const formHtml = await form.innerHTML();
  console.log('フォームのHTML:', formHtml);
  
  // タイトル入力
  await page.waitForSelector('input[type="text"]', { state: 'visible', timeout: 60000 });
  await page.fill('input[type="text"]', 'テスト投稿');
  console.log('タイトルを入力しました');
  
  // 本文入力
  await page.waitForSelector('textarea', { state: 'visible', timeout: 60000 });
  await page.fill('textarea', 'これはテスト投稿です');
  console.log('本文を入力しました');
  
  // 日付入力
  await page.waitForSelector('input[type="date"]', { state: 'visible', timeout: 60000 });
  await page.fill('input[type="date"]', '2025-06-16');
  console.log('日付を入力しました');
  
  // 投稿ボタンをクリック
  console.log('投稿ボタンを探しています...');
  const submitButton = await page.waitForSelector('button[type="submit"]', { state: 'visible', timeout: 60000 });
  console.log('投稿ボタンが見つかりました');
  await submitButton.click();
  console.log('投稿ボタンをクリックしました');
  await page.waitForLoadState('networkidle');
  
  // トップページに戻り、投稿が表示されていることを確認
  console.log('投稿の表示を確認しています...');
  const postTitle = page.locator('h2.text-lg.font-semibold').filter({ hasText: 'テスト投稿' }).first();
  const postContent = page.locator('p.text-gray-700').filter({ hasText: 'これはテスト投稿です' }).first();
  
  await expect(postTitle).toBeVisible();
  await expect(postContent).toBeVisible();
  console.log('テストが完了しました');
}); 