/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_EMAIL?: string;
  readonly VITE_COMPANY_TEL?: string;
  readonly VITE_KAKAO_CHAT_URL?: string;
  readonly VITE_NAVER_BLOG_URL?: string;
  readonly VITE_WEB3FORMS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
