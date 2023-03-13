import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const Auth = () => SetMetadata(IS_PUBLIC_KEY, false);

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
      private readonly jwtService: JwtService,
      private reflector: Reflector
  ) {
    super();
  }
  canActivate(context: ExecutionContext) {
    try {
      const IS_PUBLIC = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      const request = context.switchToHttp().getRequest();

      if (IS_PUBLIC) {
        return true;
      }

      if (!request.headers.authorization) {
        throw new UnauthorizedException('Unauthorized');
      }
      const tokenInfo = this.jwtService.verify(request?.headers?.authorization);

      return tokenInfo.login || true;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      console.log(user);
      throw err || new UnauthorizedException('Не авторизирован');
    }
    return user;
  }
}
