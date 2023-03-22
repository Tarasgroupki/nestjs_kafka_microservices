import {Body, Controller, Get, Inject, OnModuleInit, Param, Post} from '@nestjs/common';
import { ClientKafka } from "@nestjs/microservices";
import {Auth, Public} from "../auth/auth.guard";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {IProduct} from "./interfaces/product.interface";

@Controller('products')
export class ProductController implements OnModuleInit {
    constructor(
        @Inject('PRODUCT_SERVICE') private readonly productClient: ClientKafka
    ) {}

    async onModuleInit() {
        console.log('modules initing...')
        this.productClient.subscribeToResponseOf('get.product.list');
        this.productClient.subscribeToResponseOf('get.product.one');
        this.productClient.subscribeToResponseOf('create.product');

        // await this.authClient.connect();
    }

    @Auth()
    @Get('/')
    getUsers(): Observable<IProduct[]> {
        return this.productClient
            .send('get.product.list', '');
    }

    @Auth()
    @Get('/:id')
    getUser(@Param('id') id: number): Observable<IProduct> {
        return this.productClient
            .send('get.product.one', { id }).pipe(tap((u) => {
                return u;
            }));
    }

    @Auth()
    @Post('/')
    create(@Body() productDto: IProduct): Observable<IProduct> {
        return this.productClient
            .send('create.product', productDto).pipe(tap((u) => {
                return u;
            }));
    }
}
