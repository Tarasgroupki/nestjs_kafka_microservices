// import { ApiProperty } from '@nestjs/swagger';
// import { MediaDto } from '../../../media/http/dto/media.dto';
// import { PaymentDto } from '../../../payment/http/dto/payment.dto';
// import { DriverLicenceDto } from './driver.licence.dto';

export class UserDto {
  // @ApiProperty()
  public id: number;

  // @ApiProperty()
  public login: string;

  // @ApiProperty()
  public password: string;

  // @ApiProperty()
  public description: string;

  // @ApiProperty()
  public createdAt: Date;

  // @ApiProperty()
  public updatedAt: Date;
}
