import {Injectable} from '@nestjs/common';
import {UserService} from "./user.service";
import {IAuthService} from "./contracts/i.auth.service";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {UserEntity} from "./entities/user.entity";

const saltOrRounds = 10;

@Injectable()
export class AuthService implements IAuthService {
  constructor(
      private userService: UserService,
      private jwtService: JwtService
  ) {}

  public async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByLogin(username);
    if (user) {
      const match = await bcrypt.compare(pass, user.password);

      if (match) {
        const {password, ...result} = user;
        return result;
      }
    }
    return null;
  }

  public async login(user: any) {
    const payload = { login: user.login };
    const validUser = await this.validateUser(user.login, user.password);

    if (validUser) {
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      return 'Authorization failed!';
    }
  }

  public async registration(user: UserEntity, password: string): Promise<UserEntity> {
    console.log(user)
    if (!user.login && !password) {
      return null;
    }

    user.password = await bcrypt.hash(
        password,
        saltOrRounds,
    );

    return await this.createUser(user);
  }

  protected async createUser(user: UserEntity) {
    return await this.userService.create(user);
  }
}
