# Dockerfile

# ベースイメージ：Node.js + npm
FROM node:18

# 作業ディレクトリ
WORKDIR /app

# package.json と lockfile をコピー
COPY package*.json ./

# 依存関係インストール
RUN npm install

# アプリの全ファイルをコピー
COPY . .

# ポート開放（Next.js のデフォルトポート）
EXPOSE 3000

# 開発サーバ起動（ホットリロード付き）
CMD ["npm", "run", "dev"]
