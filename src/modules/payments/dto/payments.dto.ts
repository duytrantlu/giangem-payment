import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty, IsDefined, IsString } from "class-validator";

export class PaymentDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  customer: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty()
  status: string;
}

export class PaymentRequestDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  customer: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  totalAmount: number;
}