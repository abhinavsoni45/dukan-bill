import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InventoryItem } from './entities/inventory-item.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(InventoryItem.name) 
    private inventoryModel: Model<InventoryItem>,
  ) {}

  async create(createInventoryItemDto: Partial<InventoryItem>): Promise<InventoryItem> {
    try {
      // Filter out frontend-specific properties that don't belong in the database
      const dto: any = createInventoryItemDto;
      const { labelWidth, labelHeight, ...inventoryData } = dto;
      
      // Check if barcode already exists
      if (inventoryData.barcode) {
        const existingItem = await this.inventoryModel.findOne({ barcode: inventoryData.barcode });
        if (existingItem) {
          throw new Error(`Barcode ${inventoryData.barcode} already exists`);
        }
      }
      
      const createdInventoryItem = new this.inventoryModel(inventoryData);
      return await createdInventoryItem.save();
    } catch (error) {
      console.error('Error in create method:', error);
      // Handle duplicate key errors specifically
      if (error.code === 11000) {  // MongoDB duplicate key error code
        const field = Object.keys(error.keyPattern)[0];
        throw new Error(`${field} already exists: ${error.keyValue[field]}`);
      }
      throw error;
    }
  }

  async findAll(): Promise<InventoryItem[]> {
    return await this.inventoryModel.find();
  }

  async findOne(id: string): Promise<InventoryItem> {
    return await this.inventoryModel.findById(id);
  }

  async update(id: string, updateInventoryItemDto: Partial<InventoryItem>): Promise<InventoryItem> {
    const dto: any = updateInventoryItemDto;
    const { labelWidth, labelHeight, ...updateData } = dto;
    return await this.inventoryModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async remove(id: string): Promise<void> {
    await this.inventoryModel.findByIdAndDelete(id);
  }

  async findByBarcode(barcode: string): Promise<InventoryItem> {
    return await this.inventoryModel.findOne({ barcode });
  }

  // Bulk create multiple inventory items
  async createBulk(items: Partial<InventoryItem>[]): Promise<InventoryItem[]> {
    // Filter out frontend-specific properties that don't belong in the database
    const filteredItems = items.map(item => {
      const dto: any = item;
      const { labelWidth, labelHeight, ...inventoryData } = dto;
      return inventoryData;
    });
    
    const createdItems = await this.inventoryModel.insertMany(filteredItems);
    // Convert to plain objects to match return type
    return createdItems.map(item => item.toObject()) as InventoryItem[];
  }
}