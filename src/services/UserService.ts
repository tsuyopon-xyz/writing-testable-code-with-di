import UserEntity from '@src/entities/UserEntity';
import type { UserInputType } from '@src/entities/UserEntity';
import type IUserRepository from '@src/repositories/IUserRepository';

export default class UserService {
  private readonly repository: IUserRepository;

  // 抽象のRepository(今回で言うとIUserRepository)を指定することで、
  // IUserRepositoryをimplementsして実装したRepositoryクラスなら何でもconstructorで受け取れるようになっている。
  //
  // このレポジトリ内でIUserRepositoryをimplementsしているクラスは以下の3つで、いずれのRepositoryインスタンスはUserServiceクラスのconstructorに渡すことができる。
  // - ArrayUserRepository （src/repositories/ArrayUserRepository.ts）
  // - DBUserRepository (src/repositories/DBUserRepository.ts)
  // - MockUserRepository (tests/services/UserService.test.tsの冒頭で定義しているクラス)
  //
  // 抽象に依存することで、Repositoryを切り替えたいと思った時、このUserServiceクラスには修正を加える必要はなくなる。（クラス間が疎結合を実現できているため）
  // 逆に、抽象ではなく具体的なクラスに依存しているBadUserServiceクラス（src/services/BadUserService.ts）は、Repositoryを切り替えたいと思ったら、BadUserServiceクラスにも修正を加える必要がでてくる。（クラス間が密結合となっているため）
  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async registerUser({ name, age }: UserInputType): Promise<UserEntity> {
    const entity = new UserEntity({ name, age });

    return await this.repository.save(entity);
  }
}
