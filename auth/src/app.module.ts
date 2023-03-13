import { Module } from '@nestjs/common';
// import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from "./http/controllers/auth.controller";
import { UserService } from "./domain/user.service";
import { UserRepository } from "./database/user.repository";
import { UserController } from "./http/controllers/user.controller";
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthService } from "./domain/auth.service";
import { LocalStrategy } from "./domain/local.strategy";


@Module({
  imports: [
      PrismaModule,
      PassportModule,
      JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
      }),
  //   SequelizeModule.forRoot({
  //   dialect: 'postgres',
  //   host: 'localhost',
  //   port: 5432,
  //   username: 'pguser',
  //   password: 'pgpwd',
  //   database: 'maindb',
  //   synchronize: true,
  //   models: [
  //
  //   ],
  // }),
  ],
  controllers: [UserController, AuthController],
  providers: [AppService, UserRepository, UserService, AuthService, LocalStrategy],
})
export class AppModule {}
