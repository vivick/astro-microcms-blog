// src/library/microcms.ts
import { createClient } from "microcms-js-sdk";
import type { MicroCMSQueries } from "microcms-js-sdk";

console.log("Domain:", import.meta.env.MICROCMS_SERVICE_DOMAIN);
console.log("API_KEY:", import.meta.env.MICROCMS_API_KEY ? "EXISTS" : "MISSING");


// クライアントの初期化（これはすでに書いてあるものをそのまま使用）
export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});


// ==========================================
// 1. ニュース用の型定義（TypeScript）
// ==========================================
export interface News {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  summary: string;
  date: string;
  content: string;
  eyecatch?: {
    url: string;
    width: number;
    height: number;
  };
}


// ==========================================
// 2. APIを叩く共通関数
// ==========================================

// ニュース一覧を取得する関数
export const getNews = async (queries?: MicroCMSQueries) => {
  return await client.getList<News>({
    endpoint: "news", // microCMSで設定したエンドポイント
    queries,         // 引数で渡し、呼び出し側で件数制限などをかけられるようにする
  });
};

// ニュース詳細を取得する関数
export const getNewsDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  return await client.getListDetail<News>({
    endpoint: "news",
    contentId,
    queries,
  });
};


// ==========================================
// 1. ブログ用の型定義（TypeScript）
// ==========================================
export interface Blog {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  eyecatch?: {
    url: string;
    width: number;
    height: number;
  };
  category: string;
  date: string;
  content: string;
}

// ==========================================
// 2. APIを叩く共通関数
// ==========================================

// ブログ一覧を取得する関数
export const getBlog = async (queries?: MicroCMSQueries) => {
  return await client.getList<Blog>({
    endpoint: "blogs", // microCMSで設定したエンドポイント
    queries,         // 引数で渡し、呼び出し側で件数制限などをかけられるようにする
  });
};

// ブログ詳細を取得する関数
export const getBlogDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  return await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId,
    queries,
  });
};