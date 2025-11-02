import { Injectable, Logger, Inject } from '@nestjs/common';
import { InventoryItem } from '../inventory/entities/inventory-item.entity';
import { QzTrayService } from './qz-tray.service';

@Injectable()
export class PrinterService {
  private readonly logger = new Logger(PrinterService.name);

  constructor(
    @Inject(QzTrayService)
    private readonly qzTrayService: QzTrayService,
  ) {}

  // Generate TSC commands for a single inventory item
  generateTSCCommands(item: InventoryItem, template: string = 'default', widthInches: number = 0.984, heightInches: number = 0.59): string[] {
    // Use fixed positioning for TSC-TE244 compatibility
    // Position coordinates in dots (203 DPI)
    
    // TSC commands as an array - starting with size and setup
    const commands = [
      `SIZE ${widthInches * 25.4} mm, ${heightInches * 25.4} mm`, // Set label size in mm
      `GAP 0 mm`, // Set gap between labels to 0
    ];

    // Add content based on the template with proper positioning
    switch (template) {
      case 'mrp_template':
        // Item name
        if (item.itemName) {
          commands.push(`TEXT 10,10,"TSS24.BF",0,1,1,"${item.itemName.substring(0, 20)}"`); // Limit length
        }
        
        // Purity and net weight
        const details = [];
        if (item.purity) details.push(item.purity);
        if (item.netWeight) details.push(`${item.netWeight}g`);
        
        if (details.length > 0) {
          commands.push(`TEXT 10,35,"TSS24.BF",0,1,1,"${details.join(' | ')}"`);
        }
        
        // MRP
        if (item.mrp) {
          commands.push(`TEXT 10,60,"TSS24.BF",0,1,1,"MRP: ₹${item.mrp}"`);
        }
        
        // Barcode
        if (item.barcode) {
          commands.push(`BARCODE 10,85,"128",30,1,0,2,2,"${item.barcode}"`);
          // Add barcode text below barcode
          commands.push(`TEXT 10,105,"TSS24.BF",0,1,1,"${item.barcode.substring(0, 15)}"`);
        }
        break;
        
      case 'weight_template':
        // Item name
        if (item.itemName) {
          commands.push(`TEXT 10,10,"TSS24.BF",0,1,1,"${item.itemName.substring(0, 20)}"`);
        }
        
        // Total weight and net weight
        const weightDetails = [];
        if (item.totalWeight) weightDetails.push(`T: ${item.totalWeight}g`);
        if (item.netWeight) weightDetails.push(`N: ${item.netWeight}g`);
        
        if (weightDetails.length > 0) {
          commands.push(`TEXT 10,35,"TSS24.BF",0,1,1,"${weightDetails.join(' ')}"`);
        }
        
        // Purity if available
        if (item.purity) {
          commands.push(`TEXT 10,60,"TSS24.BF",0,1,1,"${item.purity}"`);
        }
        
        // Barcode
        if (item.barcode) {
          commands.push(`BARCODE 10,85,"128",30,1,0,2,2,"${item.barcode}"`);
          commands.push(`TEXT 10,105,"TSS24.BF",0,1,1,"${item.barcode.substring(0, 15)}"`);
        }
        break;
        
      case 'basic_template':
      default:
        // Basic template with just name and barcode
        if (item.itemName) {
          commands.push(`TEXT 10,10,"TSS24.BF",0,1,1,"${item.itemName.substring(0, 20)}"`);
        }
        
        if (item.barcode) {
          commands.push(`BARCODE 10,40,"128",40,1,0,2,2,"${item.barcode}"`);
          commands.push(`TEXT 10,60,"TSS24.BF",0,1,1,"${item.barcode.substring(0, 15)}"`);
        }
        break;
    }
    
    // Final print command
    commands.push(`PRINT 1`);
    
    return commands;
  }

  // Generate TSC commands for multiple items (batch printing)
  generateBatchTSCCommands(items: InventoryItem[], template: string = 'default', widthInches: number = 0.984, heightInches: number = 0.59): string[] {
    const allCommands = [`CLS`]; // Clear buffer once at the beginning for batch print
    for (const item of items) {
      const itemCommands = this.generateTSCCommands(item, template, widthInches, heightInches);
      allCommands.push(...itemCommands);
    }
    return allCommands;
  }

  // Actually print the labels using QZ Tray from the backend
  async printLabels(tscCommands: string[]): Promise<boolean> {
    try {
      this.logger.log(`Attempting to print ${tscCommands.length} commands via QZ Tray from backend`);
      
      // Use QZ Tray service to actually print from backend
      const success = await this.qzTrayService.printToTscPrinter(tscCommands);
      
      if (success) {
        this.logger.log('Successfully sent labels to printer via QZ Tray from backend');
      } else {
        this.logger.warn('QZ Tray reported success but printing may not have completed');
      }
      
      return success;
    } catch (error) {
      this.logger.error('Error printing labels via QZ Tray from backend:', error);
      throw error;
    }
  }
  
  // Find available printers
  async getAvailablePrinters(): Promise<string[]> {
    try {
      return await this.qzTrayService.findPrinters();
    } catch (error) {
      this.logger.error('Error finding printers:', error);
      throw error;
    }
  }
}