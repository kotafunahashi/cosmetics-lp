1. プロジェクト名と概要

# Cosmetics LP Project 🌿
InstagramやYouTubeからの流入に応じておすすめ商品を変更し、雨の日には特別な商品を表示するコスメLPサイトです。

2. デモ（任意）

## 🚀 デモ
[ライブデモを見る]
https://cosmetics-lp.vercel.app/lp/
https://cosmetics-lp.vercel.app/lp/instagram
https://cosmetics-lp.vercel.app/lp/youtube

3. インストール手順

## 🛠️ インストール手順

1. リポジトリをクローン:
   ```bash
   git clone https://github.com/kotafunahashi/cosmetics-lp.git
   cd cosmetics-lp

2. パッケージをインストール:

npm install

3. 環境変数を設定（.env ファイルを作成して、APIキーを設定してください）:

OPENWEATHER_API_KEY=あなたのAPIキー

4. サーバーを起動:

npm run dev

ブラウザで http://localhost:3000 にアクセス！


---

### 4. **使い方**

## 📖 使い方

- `http://localhost:3000/lp/instagram` からアクセスすると Instagram 向けの画像が表示されます。
- 天気が雨予報の日には「雨の日おすすめ商品」が追加されます。  

5. ファイル構成

## 📂 ファイル構成

/app ├── lp 
     ├── [source] │
        │ └── page.tsx
     │ └── page.tsx
├── public │
     ├── products.json
     │ └── images
 └── .env

 6. 技術構成

 ## ⚙️ 技術構成

- Next.js
- TypeScript
- Tailwind CSS
- OpenWeather API

7. ライセンス

## 📄 ライセンス
このプロジェクトは MIT ライセンスのもとで公開されています。
