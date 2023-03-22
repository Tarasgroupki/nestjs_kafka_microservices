import {Body, Controller, Get, Inject, OnModuleInit, Param, Post} from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from "@nestjs/microservices";

@Controller()
export class AppController implements OnModuleInit {
  constructor(
      private readonly appService: AppService,
      @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka
  ) {}

  async onModuleInit() {
    console.log('modules initing...')
    // this.authClient.subscribeToResponseOf('get.user.list');
    // this.authClient.subscribeToResponseOf('get.user.one');

    // await this.authClient.connect();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('/users')
  // getUsers(): any {
  //   return this.authClient
  //       .send('get.user.list', '');
  // }
  //
  // @Get('/users/:id')
  // getUser(@Param('id') id: number): any {
  //   console.log(id)
  //   return this.authClient
  //       .send('get.user.one', { id });
  // }

  // @Post()
  // createOrder(@Body() createOrderRequest: CreateOrderRequest) {
  //   this.appService.createOrder(createOrderRequest);
  // }
}
