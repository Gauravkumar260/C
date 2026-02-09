import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomizationDto {
  @ApiProperty({ example: 'vehicle-uuid' })
  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({ example: '{"COLOR": "option-uuid", "WHEELS": "option-uuid"}' })
  @IsString()
  @IsNotEmpty()
  config: string;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  totalPrice: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  preview?: string;
}
