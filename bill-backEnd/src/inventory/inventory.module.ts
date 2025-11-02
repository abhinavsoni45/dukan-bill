import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { PrintController } from './print.controller';
import { PrinterService } from './printer.service';
import { QzTrayService } from './qz-tray.service';
import { InventoryItem, InventoryItemSchema } from './entities/inventory-item.entity';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: InventoryItem.name, schema: InventoryItemSchema }])
  ],
  controllers: [InventoryController, PrintController],
  providers: [InventoryService, PrinterService, QzTrayService],
  exports: [InventoryService, PrinterService],
})
export class InventoryModule {}