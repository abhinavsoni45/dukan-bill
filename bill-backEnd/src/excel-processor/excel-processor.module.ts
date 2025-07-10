import { Module } from '@nestjs/common';
// import { BullModule } from '@nestjs/bull'; // Commented out BullModule
import { ExcelProcessorService } from './excel-processor.service';
import { GirviModule } from 'src/girvi/girvi.module'; // Import GirviModule

@Module({
  imports: [
    // BullModule.forRoot({ // Commented out BullModule configuration
    //   redis: {
    //     host: 'localhost',
    //     port: 6379,
    //   },
    // }),
    // BullModule.registerQueue({ // Commented out BullModule configuration
    //   name: 'excel-parse-queue',
    // }),
    GirviModule, // Import GirviModule here
  ],
  providers: [ExcelProcessorService],
  exports: [ExcelProcessorService],
})
export class ExcelProcessorModule {}
