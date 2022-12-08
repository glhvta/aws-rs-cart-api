import { Inject, Injectable } from '@nestjs/common';
import { Client, QueryResult } from 'pg';

import { v4 } from 'uuid';

import { Cart, CartItem } from '../models';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};

  constructor(@Inject('PG_CLIENT') private readonly client: Client) {}

  async findByUserId(userId: string): Promise<Cart> {
    console.log('Trying to find cart by user id', userId);

    const response = await this.client.query(
      `SELECT id, product_id, count FROM carts LEFT JOIN cart_items ON carts.id = cart_items.cart_id WHERE user_id='${userId}'`,
    );

    if (!response.rows.length) {
      console.log('No carts found for user: ', userId);

      return;
    }
    
    const cartItems = this.createCartItem(response);

    console.log('Cart items: ', cartItems);
    
    return {
      items: cartItems,
      id: response.rows[0].id,
    };
  }

  private createCartItem (response: QueryResult<any>): CartItem[] {
    return response.rows
      .filter((data) => data['product_id'])
      .reduce((acc, data) => [
        ...acc,
        { 
          productId: data['product_id'], 
          count: data.count, 
        }
      ], []);
  }

  async createByUserId(userId: string) {
    const id = v4(v4());

    await this.client.query(
      `INSERT INTO carts (id, user_id) VALUES ('${id}', '${userId}')`
    );

    return { id, items: [] };
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    console.log('Client query ', userId);
    
    const userCart = await this.findByUserId(userId);

    console.log('user card', userCart);

    if (userCart) {
      return userCart;
    }

    console.log('Create was not found. Creating new card');

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    console.log('Update by user id', userId, items);

    const { id } = await this.findOrCreateByUserId(userId);

    await this.client.query(`DELETE FROM cart_items WHERE cart_id='${id}'`);

    console.log('Card data was successfully deleted.');

    const updatedValues = items.map(item => `('${id}', '${item.productId}', ${item.count})`);

    console.log('Updated values ', updatedValues);

    await this.client.query(
     `INSERT INTO cart_items (cart_id, product_id, count) VALUES ${updatedValues}`
    );

    console.log('Data was successfully updated');

    return { id, items: [ ...items ] };
  }

  async removeByUserId(userId): Promise<void> {
    console.log('Remove by user id ', userId);

    await this.client.query(`DELETE FROM carts WHERE user_id='${userId}'`);

    console.log('Cart was removed successfully');
  }
}
