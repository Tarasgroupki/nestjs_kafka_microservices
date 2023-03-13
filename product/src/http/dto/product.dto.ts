// import { ApiProperty } from '@nestjs/swagger';
// import { MediaDto } from '../../../media/http/dto/media.dto';
// import { PaymentDto } from '../../../payment/http/dto/payment.dto';
// import { DriverLicenceDto } from './driver.licence.dto';

export class ProductDto {
  // @ApiProperty()
  public id: number;

  // @ApiProperty()
  public title: string;

  // @ApiProperty()
  public description: string;

  public price: string;

  // @ApiProperty()
  public createdAt: Date;

  // @ApiProperty()
  public updatedAt: Date;
}
