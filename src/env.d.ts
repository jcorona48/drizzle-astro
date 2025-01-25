/// <reference types="astro/client" />

interface ImportMetaEnv {
    TURSO_DATABASE_URL: string;
    TURSO_AUTH_TOKEN: string;
}

interface ImportMeta {
    env: ImportMetaEnv;
}
