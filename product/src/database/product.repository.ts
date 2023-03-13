import {Injectable} from '@nestjs/common';
import {ProductEntity} from "../domain/entities/product.entity";
import {PrismaService} from "../../prisma/prisma.service";
import {IProductRepository} from "../domain/contracts/i.product.repository";
import {ProductMapper} from "./product.mapper";
import {Product} from "./models/Product";

@Injectable()
export class ProductRepository implements IProductRepository {
  private db: PrismaService;

  constructor(private readonly prisma: PrismaService) {
    this.db = prisma;
  }

  public async findAll(): Promise<ProductEntity[]> {
    try {
      let logic = {};

      const products = await this.db.product.findMany(logic);

      if (!products) {
        return null;
      }

      return products.map((p): ProductEntity => {
        return new ProductMapper().mapToEntityFromModel(p as Product);
      });
    } catch (err) {
      throw err;
    }
  }

  public async findById(id: number): Promise<ProductEntity> {
    try {
      const product = await this.db.product.findUnique({ where: { id: id } });

      if (!product) {
        return null;
      }

      return new ProductMapper().mapToEntityFromModel(product);
    } catch (err) {
      throw err;
    }
  }

  public async create(product: ProductEntity): Promise<ProductEntity> {
    try {
      const productModel = new ProductMapper().mapToProductModelFromEntity(product);
      const productCreated = await this.db.product.create({
        data: productModel
      });

      if (!productCreated) {
        return null;
      }
      console.log(productCreated);

      return product;
    } catch (err) {
      throw err;
    }
  }
}
