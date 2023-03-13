import {Body, Controller, Get, Inject, OnModuleInit, Param, Post} from '@nestjs/common';
import { ClientKafka } from "@nestjs/microservices";
import {Public} from "./auth.guard";
import {ILogin, IRegistration} from "./interfaces/auth.interface";

@Controller('auth')
export class AuthController implements OnModuleInit {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka
    ) {}

    async onModuleInit() {
        console.log('modules initing...')
        this.authClient.subscribeToResponseOf('auth.login');
        this.authClient.subscribeToResponseOf('auth.registration');

        // await this.authClient.connect();
    }

    @Public()
    @Post('login')
    async login(@Body() loginDto: ILogin) {
        return this.authClient.send(
           'auth.login',
            loginDto,
          );
    }

    @Public()
    @Post('register')
    async register(@Body() registerDto: IRegistration) {
        return this.authClient.send(
            'auth.registration',
            registerDto
        );
    }
}
