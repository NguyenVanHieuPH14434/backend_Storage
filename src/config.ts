import * as path from 'path';
import * as dotenv from 'dotenv';
import * as os from 'os';

export async function ReadConfig() {
    dotenv.config();
    const config = {
        server: {
            port: process.env.PORT || 3000,
        },
        database: {
            db_url: process.env.DB_URL,
            db_name: process.env.DB_NAME,
        },
    };

    return config;
}

