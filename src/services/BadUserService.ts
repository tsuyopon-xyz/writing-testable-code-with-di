import UserEntity from '@src/entities/UserEntity';
import type { UserInputType } from '@src/entities/UserEntity';
import type DBUserRepository from '@src/repositories/DBUserRepository';

export default class BadUserService {
  private readonly repository: DBUserRepository;

  // UserServiceクラス(src/services/UserService.ts)内のコメントにも書いたように、
  // BadUserServiceクラスは抽象ではなく具体的なRepository(今回で言うとDBUserRepository)に依存している。
  // そのため、別のRepository(例えばDBUserRepository)に切り替えたいと思った時にBadUserServiceクラスの修正が必要となる。（UserServiceクラスは修正は不要）
  //
  // これはテストの時に、モック用のRepositoryに差し替えることができないことを意味する。
  // (UserServiceクラスは抽象のRepositoryに依存しているため、Repositoryの差し替えが可能。)
  // モック用のRepositoryに差し替えているサンプルコードは tests/services/UserService.test.ts のテストコードを参照。
  constructor(repository: DBUserRepository) {
    this.repository = repository;
  }

  async registerUser({ name, age }: UserInputType): Promise<UserEntity> {
    const entity = new UserEntity({ name, age });

    return await this.repository.save(entity);
  }
}
