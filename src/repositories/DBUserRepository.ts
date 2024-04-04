import UserEntity from '@src/entities/UserEntity';
import type IUserRepository from './IUserRepository';
import type DB from '@src/db/DB';

export default class DBUserRepository implements IUserRepository {
  private readonly db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  async save(user: UserEntity): Promise<UserEntity> {
    if (user.id) {
      throw new Error('既に新規作成済みです');
    }

    const id = await this.db.insert(user);

    return new UserEntity({ id, name: user.name, age: user.age });
  }
}
