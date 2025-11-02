import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryItem } from './entities/inventory-item.entity';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createInventoryItemDto: Partial<InventoryItem>) {
    try {
      return await this.inventoryService.create(createInventoryItemDto);
    } catch (error) {
      console.error('Error creating inventory item:', error);
      throw error;
    }
  }

  @Post('bulk')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createBulk(@Body() createInventoryItemsDto: Partial<InventoryItem>[]) {
    try {
      return await this.inventoryService.createBulk(createInventoryItemsDto);
    } catch (error) {
      console.error('Error creating bulk inventory items:', error);
      throw error;
    }
  }

  @Get()
  async findAll() {
    return await this.inventoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.inventoryService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id: string, @Body() updateInventoryItemDto: Partial<InventoryItem>) {
    return await this.inventoryService.update(id, updateInventoryItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.inventoryService.remove(id);
  }

  @Get('barcode/:barcode')
  async findByBarcode(@Param('barcode') barcode: string) {
    return await this.inventoryService.findByBarcode(barcode);
  }
}