import {Injectable} from '@nestjs/common';
import {IProductService} from "./contracts/i.product.service";
import {ProductEntity} from "./entities/product.entity";
import {ProductRepository} from "../database/product.repository";

@Injectable()
export class ProductService implements IProductService {
  constructor(
      private productRepository: ProductRepository
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.findAll();
  }

  async findById(id: number): Promise<ProductEntity> {
    return await this.productRepository.findById(id);
  }

  async create(product: ProductEntity): Promise<ProductEntity> {
    return await this.productRepository.create(product);
  }
}
