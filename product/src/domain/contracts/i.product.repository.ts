import { ProductEntity } from "../entities/product.entity";

export interface IProductRepository {
  findAll(): Promise<ProductEntity[]>;

  findById(id: number): Promise<ProductEntity>;

  create(product: ProductEntity): Promise<ProductEntity>;
}
