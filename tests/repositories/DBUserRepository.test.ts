import { describe, expect, it } from 'bun:test';
import UserEntity from '@src/entities/UserEntity';
import DB from '@src/db/DB';
import DBUserRepository from '@src/repositories/DBUserRepository';

describe('DBUserRepository', () => {
  describe('正常系', () => {
    describe('save', () => {
      it('idが無いUserEntityを渡すと、id付きのUserEntityが返ってくる', async () => {
        const db = new DB();
        const repository = new DBUserRepository(db);
        const result = await repository.save(
          new UserEntity({ name: 'a', age: 0 }),
        );

        expect(result).toEqual(new UserEntity({ id: 1, name: 'a', age: 0 }));
      });
    });
  });

  describe('異常系', () => {
    describe('save', () => {
      it('idがあるUserEntityを渡すと例外が発生する', async () => {
        const db = new DB();
        const repository = new DBUserRepository(db);

        expect(
          async () =>
            await repository.save(new UserEntity({ id: 1, name: 'a', age: 0 })),
        ).toThrow(new Error('既に新規作成済みです'));
      });
    });
  });
});
