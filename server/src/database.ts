import { Client } from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

export class Connection {
    private client: Client;

    constructor() {
        this.client = new Client({
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            host: process.env.NODE_ENV === 'test' ? 'localhost' : process.env.DB_HOST,
            password: process.env.DB_PASS,
            port: parseInt(<string>process.env.DB_PORT, 10),
            query_timeout: 10000,
        });
        this.connect();
    }

    connect() {
        this.client.connect((err) => {
            if (err) {
                console.error('connection error', err);
            }
        });
    }

    disconnect() {
        this.client.end();
    }

    resetConnection() {
        this.disconnect();
        this.client = new Client({
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            password: process.env.DB_PASS,
            port: parseInt(<string>process.env.DB_PORT, 10),
            query_timeout: 10000,
        });
        this.connect();
        return this.client;
    }

    getConnection() {
        return this.client;
    }

    populate() {
        return new Promise((resolve, reject) => {
            fs.readFile('Database.ddl', 'utf-8', (err, data) => {
                if (err) throw err;
                this.client
                    .query(data)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        });
    }
}
