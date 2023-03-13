import {Controller} from '@nestjs/common';
import {EventPattern, MessagePattern} from '@nestjs/microservices';
import {UserService} from '../../domain/user.service';
import {AuthService} from "../../domain/auth.service";
import {LoginDto} from "../dto/auth.dto";
import {UserDto} from "../dto/user.dto";
import {UserMapper} from "../mappers/user.mapper";

// import { AppService } from './app.service';

@Controller()
export class AuthController {
  constructor(
      private readonly userService: UserService,
      private readonly authService: AuthService
  ) {}

  @MessagePattern('auth.login')
  async login(data: { value: LoginDto }) {
    return await this.authService.login(data.value);
  }

  @MessagePattern('auth.registration')
  async registration(data: { value: UserDto }) {
    const regUser = new UserMapper().mapUserDtoToEntity(data.value);

    return await this.authService.registration(regUser, data.value.password);
  }
}
