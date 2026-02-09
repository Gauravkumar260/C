import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCustomizationDto } from './dto/create-customization.dto';

@Injectable()
export class CustomizationService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateCustomizationDto) {
    return this.prisma.customization.create({
      data: {
        userId,
        vehicleId: dto.vehicleId,
        config: dto.config,
        totalPrice: dto.totalPrice,
        preview: dto.preview,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.customization.findMany({
      where: { userId },
      include: {
        vehicle: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const customization = await this.prisma.customization.findUnique({
      where: { id },
      include: {
        vehicle: true,
      },
    });

    if (!customization) {
      throw new NotFoundException('Customization not found');
    }

    if (customization.userId !== userId) {
      throw new NotFoundException('Customization not found'); // Hide existence
    }

    return customization;
  }
}
