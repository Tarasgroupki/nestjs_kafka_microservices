import { UserDto } from '../dto/user.dto';
import { UserEntity } from "../../domain/entities/user.entity";

export class UserMapper {
  constructor() {}

  public mapToUserDto(user: UserEntity): UserDto {
    const userDto: UserDto = new UserDto();

    userDto.id = user.id;
    userDto.login = user.login;
    userDto.description = user.description;

    return userDto;
  }

  public mapUserDtoToEntity(userDto: UserDto): UserEntity {
    const user: UserEntity = new UserEntity();

    user.id = userDto.id;
    user.login = userDto.login;
    user.description = userDto.description;

    return user;
  }
}
