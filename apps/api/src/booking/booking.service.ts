import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingStatus } from './booking-status.enum';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {
    const { userId, dealershipId, scheduledTime } = createBookingDto;

    return this.prisma.$transaction(async (tx) => {
      // Check for double booking
      const existingBooking = await tx.booking.findFirst({
        where: {
          dealershipId,
          scheduledTime: new Date(scheduledTime),
          status: {
            not: BookingStatus.CANCELLED,
          },
        },
      });

      if (existingBooking) {
        throw new BadRequestException('Slot already booked');
      }

      return tx.booking.create({
        data: {
          userId,
          dealershipId,
          scheduledTime: new Date(scheduledTime),
          status: BookingStatus.PENDING,
        },
      });
    });
  }
}
