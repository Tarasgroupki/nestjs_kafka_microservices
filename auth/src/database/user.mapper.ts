import { User } from './models/User';
import { UserEntity } from "../domain/entities/user.entity";

export class UserMapper {
  constructor() {}

  public mapToUserModelFromEntity(user: UserEntity): User {
    const userModel: User = new User();

    userModel.id = user.id;
    userModel.login = user.login;
    userModel.description = user.description;

    return userModel;
  }

  public mapToEntityFromModel(user: User, needPwd = false): UserEntity {
    const userEntity: UserEntity = new UserEntity();

    userEntity.id = user.id;
    userEntity.login = user.login;
    userEntity.description = user.description;
    if (needPwd) {
      userEntity.password = user.password;
    }

    return userEntity;
  }
}
