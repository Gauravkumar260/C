import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateOrderDto) {
    const customization = await this.prisma.customization.findUnique({
      where: { id: dto.customizationId },
    });

    if (!customization) {
      throw new NotFoundException('Customization not found');
    }

    return this.prisma.order.create({
      data: {
        userId,
        customizationId: dto.customizationId,
        totalPrice: customization.totalPrice,
        status: 'PENDING',
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        customization: {
          include: {
            vehicle: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
