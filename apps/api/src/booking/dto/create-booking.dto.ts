import { IsString, IsDateString, IsMongoId } from 'class-validator';

export class CreateBookingDto {
  @IsMongoId()
  userId: string;

  @IsString()
  dealershipId: string;

  @IsDateString()
  scheduledTime: string;
}
