import { Client } from 'pg';
import { Module } from '@nestjs/common';

const dbProvider = {
  provide: 'PG_CLIENT',
  useFactory: async () => {
    const client = new Client({
      database: process.env.PGDATABASE,
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT),
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
    });

    await client.connect();

    return client;
  },
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}