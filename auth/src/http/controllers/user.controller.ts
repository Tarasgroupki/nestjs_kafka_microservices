import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from '../../domain/user.service';
import { UserDto } from '../dto/user.dto';
import { UserMapper } from "../mappers/user.mapper";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('get.user.list')
  async getUsers(): Promise<UserDto[]> {
    const users = await this.userService.findAll();

    return users.map((u): UserDto => {
      return new UserMapper().mapToUserDto(u);
    });
  }

  @MessagePattern('get.user.one')
  async getUser(data: { value: { id: number } }) {
    const user = await this.userService.findOne(+data.value.id);

    return new UserMapper().mapToUserDto(user);
  }
}
