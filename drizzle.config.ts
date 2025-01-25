import { DB_CONFIG } from '@/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema/index.ts',
  dialect: 'turso',
  dbCredentials: {
    url: DB_CONFIG.DATABASE_URL,
    authToken: DB_CONFIG.AUTH_TOKEN,
  },
});
