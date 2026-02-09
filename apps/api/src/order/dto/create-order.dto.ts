import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: 'customization-uuid' })
  @IsString()
  @IsNotEmpty()
  customizationId: string;
}
