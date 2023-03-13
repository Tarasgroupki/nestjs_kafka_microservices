import { UserEntity } from '../entities/user.entity';

export interface IUserService {
  findAll(): Promise<UserEntity[]>;

  findOne(id: number): Promise<UserEntity>;

  findByLogin(login: string): Promise<UserEntity>;

  create(user: UserEntity): Promise<UserEntity>;
}
