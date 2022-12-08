import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';

import { v4 } from 'uuid';

import { User } from '../models';

@Injectable()
export class UsersService {
  constructor(@Inject('PG_CLIENT') private readonly client: Client) {}

  async findOne(name: string): Promise<User> {
    const response = await this.client.query<User>(
      `SELECT id, name, password, email FROM users WHERE name='${name}' LIMIT 1`,
    );

    return response.rows[0];
  }

  async createOne({ name, password }: User): Promise<User> {
    const id = v4(v4());
    const newUser = { id, name, password };

    console.log('Creating new user', newUser);
    
    await this.client.query(
      `INSERT INTO users (id, name, password) VALUES ('${id}', '${name}', '${password}')`
    );

    console.log('Creating new user', newUser);

    return newUser;
  }
}
