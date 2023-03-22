import {Body, Controller, Get, Inject, OnModuleInit, Param, Post} from '@nestjs/common';
import { ClientKafka } from "@nestjs/microservices";
import {Auth} from "./auth.guard";
import {IUser} from "./interfaces/user.interface";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

@Controller('users')
export class UserController implements OnModuleInit {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka
    ) {}

    async onModuleInit() {
        console.log('modules initing...')
        this.authClient.subscribeToResponseOf('get.user.list');
        this.authClient.subscribeToResponseOf('get.user.one');

        // await this.authClient.connect();
    }

    @Auth()
    @Get('/')
    getUsers(): Observable<IUser[]> {
        return this.authClient
            .send('get.user.list', '');
    }

    @Auth()
    @Get('/:id')
    getUser(@Param('id') id: number): Observable<IUser> {
        return this.authClient
            .send('get.user.one', { id }).pipe(tap((u) => {
                return u;
            }));
    }
}
