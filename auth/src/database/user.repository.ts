import {Injectable} from '@nestjs/common';
import {IUserRepository} from '../domain/contracts/i.user.repository';
import {User} from '@prisma/client';
import {UserMapper} from './user.mapper';
import {UserEntity} from '../domain/entities/user.entity';
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class UserRepository implements IUserRepository {
  private db: PrismaService;

  constructor(private readonly prisma: PrismaService) {
    this.db = prisma;
  }

  public async findAll(): Promise<UserEntity[]> {
    try {
      let logic = {};

      const users = await this.db.user.findMany(logic);

      if (!users) {
        return null;
      }

      return users.map((u): UserEntity => {
        return new UserMapper().mapToEntityFromModel(u as User);
      });
    } catch (err) {
      throw err;
    }
  }

  public async findById(id: number): Promise<UserEntity> {
    try {
      const user = await this.db.user.findUnique({ where: { id: id } });

      if (!user) {
        return null;
      }

      return new UserMapper().mapToEntityFromModel(user);
    } catch (err) {
      throw err;
    }
  }

  public async findByLogin(login: string): Promise<UserEntity> {
    try {
      const user = await this.db.user.findUnique({ where: { login } });

      if (!user) {
        return null;
      }

      return new UserMapper().mapToEntityFromModel(user, true);
    } catch (err) {
      throw err;
    }
  }

  public async create(user: UserEntity): Promise<UserEntity> {
    try {
      const userModel = new UserMapper().mapToUserModelFromEntity(user);
      userModel.password = user.password;
      const userCreated = await this.db.user.create({
        data: userModel
      });

      if (!userCreated) {
        return null;
      }

      return user;
    } catch (err) {
      throw err;
    }
  }
}
