import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CustomizationService } from './customization.service';
import { CreateCustomizationDto } from './dto/create-customization.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Customizations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('customizations')
export class CustomizationController {
  constructor(private readonly customizationService: CustomizationService) {}

  @Post()
  @ApiOperation({ summary: 'Save a customization' })
  @ApiResponse({ status: 201, description: 'Customization saved.' })
  create(@Request() req: any, @Body() dto: CreateCustomizationDto) {
    return this.customizationService.create(req.user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get my customizations' })
  @ApiResponse({ status: 200, description: 'List of customizations.' })
  findAll(@Request() req: any) {
    return this.customizationService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get customization by ID' })
  @ApiResponse({ status: 200, description: 'Customization details.' })
  @ApiResponse({ status: 404, description: 'Customization not found.' })
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.customizationService.findOne(id, req.user.userId);
  }
}
