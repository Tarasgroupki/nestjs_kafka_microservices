import {ProductEntity} from "../domain/entities/product.entity";
import {Product} from "./models/Product";

export class ProductMapper {
  constructor() {}

  public mapToProductModelFromEntity(product: ProductEntity): Product {
    const productModel: Product = new Product();

    productModel.id = product.id;
    productModel.title = product.title;
    productModel.description = product.description;
    productModel.price = product.price;

    return productModel;
  }

  public mapToEntityFromModel(product: Product): ProductEntity {
    const productEntity: ProductEntity = new ProductEntity();

    productEntity.id = product.id;
    productEntity.title = product.title;
    productEntity.description = product.description;
    productEntity.price = product.price;

    return productEntity;
  }
}
