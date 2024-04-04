import type UserEntity from '@src/entities/UserEntity';

export default interface IUserRepository {
  save(user: UserEntity): Promise<UserEntity>;
}
