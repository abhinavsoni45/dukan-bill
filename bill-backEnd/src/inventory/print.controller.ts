import { Controller, Post, Body, UsePipes, ValidationPipe, Get, Logger } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { InventoryItem } from './entities/inventory-item.entity';

interface PrintRequest {
  items: InventoryItem[];
  template?: string;
  printerName?: string;
  labelWidth?: number; // Width in inches
  labelHeight?: number; // Height in inches
}

@Controller('inventory/print')
export class PrintController {
  private readonly logger = new Logger(PrintController.name);
  
  constructor(private readonly printerService: PrinterService) {}

  @Post('single')
  @UsePipes(new ValidationPipe({ transform: true }))
  async printSingleLabel(@Body() requestBody: any) {
    try {
      const item = requestBody.item as Partial<InventoryItem>;
      const labelWidth = requestBody.labelWidth || 2.0;
      const labelHeight = requestBody.labelHeight || 1.2;
      
      this.logger.log(`Received single print request for item: ${item?.itemName || 'unknown'}`);
      const tscCommands = this.printerService.generateTSCCommands(
        item as InventoryItem, 
        requestBody.template || 'default',
        labelWidth,
        labelHeight
      );
      this.logger.log(`Generated ${tscCommands.length} TSC commands for single print`);
      
      // Just return the commands for the frontend to handle
      return { 
        success: true, 
        commands: tscCommands 
      };
    } catch (error) {
      this.logger.error('Error in printSingleLabel:', error);
      throw error;
    }
  }

  @Post('batch')
  @UsePipes(new ValidationPipe({ transform: true }))
  async printBatchLabels(@Body() request: PrintRequest) {
    try {
      this.logger.log(`Received print request for ${request.items.length} items`);
      const tscCommands = this.printerService.generateBatchTSCCommands(
        request.items, 
        request.template || 'default',
        request.labelWidth || 2.0,
        request.labelHeight || 1.2
      );
      this.logger.log(`Generated ${tscCommands.length} TSC commands for batch print`);

      // Just return the commands for the frontend to handle
      return {
        success: true,
        commands: tscCommands,
      };
    } catch (error) {
      this.logger.error('Error in printBatchLabels:', error);
      throw error;
    }
  }
  
  @Get('printers')
  async getAvailablePrinters() {
    try {
      // In the proper architecture, printer detection should be done from frontend
      // Return a placeholder response
      this.logger.log('Printer detection should be handled from frontend');
      return { 
        success: true,
        printers: [] 
      };
    } catch (error) {
      this.logger.error('Error in getAvailablePrinters:', error);
      throw error;
    }
  }
}