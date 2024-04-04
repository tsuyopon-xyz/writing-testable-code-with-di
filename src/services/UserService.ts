import UserEntity from '@src/entities/UserEntity';
import type { UserInputType } from '@src/entities/UserEntity';
import type IUserRepository from '@src/repositories/IUserRepository';

export default class UserService {
  private readonly repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async registerUser({ name, age }: UserInputType): Promise<UserEntity> {
    const entity = new UserEntity({ name, age });

    return await this.repository.save(entity);
  }
}
