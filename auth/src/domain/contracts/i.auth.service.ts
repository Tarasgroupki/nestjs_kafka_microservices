import { LoginDto } from '../../http/dto/auth.dto';
import {UserEntity} from "../entities/user.entity";

export interface IAuthService {
    validateUser(username: string, pass: string): Promise<any>;

    login(user: any);

    registration(user: UserEntity, password: string): Promise<UserEntity>;
}
