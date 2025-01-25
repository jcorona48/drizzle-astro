import { DB_CONFIG } from '@/config';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

export const db = drizzle({
    connection: {
        url: DB_CONFIG.DATABASE_URL,
        authToken: DB_CONFIG.AUTH_TOKEN,
    },
    schema,
});

export default db;