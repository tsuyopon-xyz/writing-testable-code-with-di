import { describe, expect, it } from 'bun:test';
import UserEntity from '@src/entities/UserEntity';
import ArrayUserRepository from '@src/repositories/ArrayUserRepository';

describe('ArrayUserRepository', () => {
  describe('正常系', () => {
    describe('save', () => {
      it('idが無いUserEntityを渡すと、id付きのUserEntityが返ってくる', async () => {
        const repository = new ArrayUserRepository();
        const result1 = await repository.save(
          new UserEntity({ name: 'a', age: 0 }),
        );
        const result2 = await repository.save(
          new UserEntity({ name: 'b', age: 1 }),
        );

        expect(result1).toEqual(new UserEntity({ id: 1, name: 'a', age: 0 }));
        expect(result2).toEqual(new UserEntity({ id: 2, name: 'b', age: 1 }));
      });
    });
  });

  describe('異常系', () => {
    describe('save', () => {
      it('idがあるUserEntityを渡すと例外が発生する', async () => {
        const repository = new ArrayUserRepository();

        expect(
          async () =>
            await repository.save(new UserEntity({ id: 1, name: 'a', age: 0 })),
        ).toThrow(new Error('既に新規作成済みです'));
      });
    });
  });
});
