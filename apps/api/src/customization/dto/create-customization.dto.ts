import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsMongoId,
  IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomizationDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  @IsMongoId()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({ example: { COLOR: 'option-uuid', WHEELS: 'option-uuid' } })
  @IsNotEmpty()
  @IsObject()
  config: Record<string, any>;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  totalPrice: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  preview?: string;
}
