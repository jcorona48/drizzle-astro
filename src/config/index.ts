import "dotenv/config";

export const DB_CONFIG = {
    DATABASE_URL:
        process.env.TURSO_DATABASE_URL ||
        "",
    AUTH_TOKEN:
        process.env.TURSO_AUTH_TOKEN ||
        "",
};

const config = {
    DB_CONFIG,
};

export default config;
