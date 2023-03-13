import {Injectable} from '@nestjs/common';
import { IUserService } from "./contracts/i.user.service";
import { UserEntity } from "./entities/user.entity";
import { UserRepository } from "../database/user.repository";
// import {IUserRepository} from "./contracts/i.user.repository";

@Injectable()
export class UserService implements IUserService {

  constructor(private userRepository: UserRepository) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findById(id);
  }

  async findByLogin(login: string): Promise<UserEntity> {
    return await this.userRepository.findByLogin(login);
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.create(user);
  }
}
