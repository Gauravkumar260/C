import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RequestWithUser } from '../common/interfaces/user-request.interface';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create an order from customization' })
  @ApiResponse({ status: 201, description: 'Order created.' })
  create(@Request() req: RequestWithUser, @Body() dto: CreateOrderDto) {
    return this.orderService.create(req.user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get my orders' })
  @ApiResponse({ status: 200, description: 'List of orders.' })
  findAll(@Request() req: RequestWithUser) {
    return this.orderService.findAll(req.user.userId);
  }
}
