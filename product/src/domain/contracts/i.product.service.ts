import { ProductEntity } from "../entities/product.entity";

export interface IProductService {
    findAll(): Promise<ProductEntity[]>;

    findById(id: number): Promise<ProductEntity>;
}
