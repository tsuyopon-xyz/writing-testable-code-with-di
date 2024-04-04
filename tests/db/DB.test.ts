import { describe, expect, it } from 'bun:test';
import UserEntity from '@src/entities/UserEntity';
import DB from '@src/db/DB';
import DBUserRepository from '@src/repositories/DBUserRepository';

describe('DB', () => {
  describe('正常系', () => {
    describe('insert', () => {
      it('実行するたびにインクリメントした数値(id)が返ってくる', async () => {
        const db = new DB();
        const anyValue = {};

        expect(await db.insert(anyValue)).toEqual(1);
        expect(await db.insert(anyValue)).toEqual(2);
        expect(await db.insert(anyValue)).toEqual(3);
      });
    });
  });
});
