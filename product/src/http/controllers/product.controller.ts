import {Controller} from '@nestjs/common';
import {EventPattern, MessagePattern} from '@nestjs/microservices';
import {ProductService} from "../../domain/product.service";
import {ProductDto} from "../dto/product.dto";
import {ProductMapper} from "../mappers/product.mapper";
import {ProductEntity} from "../../domain/entities/product.entity";

@Controller()
export class ProductController {
  constructor(
      private readonly productService: ProductService,
  ) {}

  @MessagePattern('get.product.list')
  async getProducts(): Promise<ProductDto[]> {
    const products = await this.productService.findAll();

    return products.map((p): ProductDto => {
      return new ProductMapper().mapToProductDto(p);
    });
  }

  @MessagePattern('get.product.one')
  async getProduct(data: { value: { id: number } }): Promise<ProductDto> {
    const product = await this.productService.findById(+data.value.id);

    return new ProductMapper().mapToProductDto(product);
  }

  @MessagePattern('create.product')
  async create(data: { value: ProductDto }): Promise<ProductDto> {
    const productEntity: ProductEntity = new ProductMapper().mapProductDtoToEntity(data.value);
    const product = await this.productService.create(productEntity);

    return new ProductMapper().mapToProductDto(product);
  }
}
