import { describe, expect, it } from 'bun:test';
import UserEntity from '@src/entities/UserEntity';
import type IUserRepository from '@src/repositories/IUserRepository';
import UserService from '@src/services/UserService';

// 実際のRepositoryを使わず、テスト用のRepositoryを用意。
// このテスト用のMockUserRepositoryでは以下のことが確認できる。
// - saveメソッドが実行された回数
// - saveメソッド実行時に引数に渡した値の記録
class MockUserRepository implements IUserRepository {
  private callCount = 0;
  private argumentStack: UserEntity[] = [];

  async save(user: UserEntity): Promise<UserEntity> {
    this.argumentStack.push(user);
    this.callCount++;

    return new UserEntity({
      id: this.callCount,
      name: user.name,
      age: user.age,
    });
  }

  // 以下は、repository.saveメソッドが実行されたときの情報を取得するメソッド群
  getCallCount() {
    return this.callCount;
  }

  getArgumentAt(index: number) {
    return this.argumentStack[index];
  }
}

describe('UserService', () => {
  describe('正常系', () => {
    describe('registerUser', () => {
      it('repository.saveメソッドが1回実行されて、id付きのUserEntityが返ってくる', async () => {
        const repository = new MockUserRepository();
        const service = new UserService(repository);
        const result = await service.registerUser({ name: 'abc', age: 99 });

        expect(result).toEqual(new UserEntity({ id: 1, name: 'abc', age: 99 }));
        expect(repository.getCallCount()).toEqual(1);
        expect(repository.getArgumentAt(0)).toEqual(
          new UserEntity({ name: 'abc', age: 99 }),
        );
      });
    });
  });
});
