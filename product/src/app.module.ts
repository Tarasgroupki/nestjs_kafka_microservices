import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {ProductController} from "./http/controllers/product.controller";
import {ProductService} from "./domain/product.service";
import {ProductRepository} from "./database/product.repository";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:9092', 'kafka:29092'],
          },
          consumer: {
            groupId: 'auth-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductRepository, ProductService],
})
export class AppModule {}
