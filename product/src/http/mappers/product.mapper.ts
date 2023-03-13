import {ProductDto} from "../dto/product.dto";
import {ProductEntity} from "../../domain/entities/product.entity";

export class ProductMapper {
  constructor() {}

  public mapToProductDto(product: ProductEntity): ProductDto {
    const productDto: ProductDto = new ProductDto();

    productDto.id = product.id;
    productDto.title = product.title;
    productDto.description = product.description;
    productDto.price = product.price;

    return productDto;
  }

  public mapProductDtoToEntity(productDto: ProductDto): ProductEntity {
    const product: ProductEntity = new ProductEntity();

    product.id = productDto.id;
    product.title = productDto.title;
    product.description = productDto.description;
    product.price = productDto.price;

    return product;
  }
}
