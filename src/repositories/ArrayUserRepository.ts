import UserEntity from '@src/entities/UserEntity';
import type IUserRepository from './IUserRepository';

export default class ArrayUserRepository implements IUserRepository {
  private nextId = 1;
  private entities: UserEntity[] = [];

  async save(user: UserEntity): Promise<UserEntity> {
    if (user.id) {
      throw new Error('既に新規作成済みです');
    }

    const entityToSave = new UserEntity({
      id: this.nextId++,
      name: user.name,
      age: user.age,
    });
    this.entities.push(entityToSave);

    return entityToSave;
  }
}
