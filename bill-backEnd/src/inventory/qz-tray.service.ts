import { Injectable, Logger } from '@nestjs/common';

declare var require: any;

@Injectable()
export class QzTrayService {
  private readonly logger = new Logger(QzTrayService.name);
  private qz: any;

  constructor() {
    try {
      // Try to load qz-tray in Node.js environment
      this.qz = require('qz-tray');
      this.logger.log('QZ Tray module loaded successfully');
    } catch (error) {
      this.logger.warn('QZ Tray module not available in this environment:', error.message);
      this.qz = null;
    }
  }

  async findPrinters(): Promise<string[]> {
    if (!this.qz) {
      throw new Error('QZ Tray is not available in this environment');
    }

    try {
      // Set up certificates
      this.qz.security.setCertificatePromise(() => {
        return this.qz.security.downloadCertificate('https://raw.githubusercontent.com/qzind/tray/master/src/qz-tray-public.crt');
      });

      this.qz.security.setSignaturePromise((toSign: string) => {
        return function(resolve: any) {
          // For development, just return the data to be signed
          resolve(toSign);
        };
      });

      await this.qz.websocket.connect({
        host: 'localhost',
        port: 8182,
        retries: 3,
        delay: 1
      });

      const printers = await this.qz.printers.find();
      await this.qz.websocket.disconnect();
      this.logger.log(`Found ${printers.length} printers: ${printers.join(', ')}`);
      return printers;
    } catch (error) {
      this.logger.error('Error finding printers:', error);
      if (this.qz && this.qz.websocket.isActive()) {
        try {
          await this.qz.websocket.disconnect();
        } catch (disconnectError) {
          this.logger.warn('Error disconnecting from QZ Tray:', disconnectError.message);
        }
      }
      throw error;
    }
  }

  async printToTscPrinter(tscCommands: string[], printerName?: string): Promise<boolean> {
    if (!this.qz) {
      throw new Error('QZ Tray is not available in this environment');
    }

    this.logger.log(`Attempting to print ${tscCommands.length} commands to printer`);
    
    try {
      // Set up certificates
      this.qz.security.setCertificatePromise(() => {
        return this.qz.security.downloadCertificate('https://raw.githubusercontent.com/qzind/tray/master/src/qz-tray-public.crt');
      });

      this.qz.security.setSignaturePromise((toSign: string) => {
        return function(resolve: any) {
          resolve(toSign);
        };
      });

      // Connect to QZ Tray
      this.logger.log('Connecting to QZ Tray...');
      await this.qz.websocket.connect({
        host: 'localhost',
        port: 8182,
        retries: 3,
        delay: 1
      });
      this.logger.log('Connected to QZ Tray successfully');
      
      // Find available printers
      const printers = await this.qz.printers.find();
      this.logger.log(`Available printers: ${printers.join(', ')}`);
      
      // Select printer
      let selectedPrinter = printerName;
      if (!selectedPrinter) {
        // Try to find TSC printer specifically
        selectedPrinter = printers.find(p => 
          p.toLowerCase().includes('tsc') || 
          p.toLowerCase().includes('te244')
        );
        
        if (!selectedPrinter) {
          // Fallback to first available printer
          selectedPrinter = printers[0];
          this.logger.warn(`No TSC printer found, using: ${selectedPrinter}`);
        }
      }

      if (!selectedPrinter) {
        throw new Error('No printers available');
      }

      this.logger.log(`Selected printer: ${selectedPrinter}`);
      
      // Configure the printer
      const config = this.qz.configs.create(selectedPrinter, {
        color: 1,           // Number of colors (1 for black)
        copies: 1,          // Number of copies
        density: 10,        // Darkness level (0-15)
        orientation: 'portrait',
        printer: selectedPrinter,
      });

      // Print the TSC commands
      await this.qz.print(config, tscCommands);
      
      this.logger.log(`Successfully sent print job to printer: ${selectedPrinter}`);
      
      // Disconnect properly
      if (this.qz.websocket.isActive()) {
        this.logger.log('Disconnecting from QZ Tray...');
        await this.qz.websocket.disconnect();
        this.logger.log('Disconnected from QZ Tray');
      }
      
      return true;
    } catch (error) {
      this.logger.error('Error in printToTscPrinter:', error);
      
      // Ensure we disconnect in case of error
      if (this.qz && this.qz.websocket.isActive()) {
        try {
          await this.qz.websocket.disconnect();
          this.logger.log('Disconnected from QZ Tray after error');
        } catch (disconnectError) {
          this.logger.warn('Error disconnecting from QZ Tray:', disconnectError.message);
        }
      }
      
      throw error;
    }
  }
}
