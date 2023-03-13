import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  findAll(): Promise<UserEntity[]>;

  findById(id: number): Promise<UserEntity>;

  findByLogin(login: string): Promise<UserEntity>;

  create(user: UserEntity): Promise<UserEntity>;
}
