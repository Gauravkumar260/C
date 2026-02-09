import { IsString, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  userId: string;

  @IsString()
  dealershipId: string;

  @IsDateString()
  scheduledTime: string;
}
