import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    const chunkFailedMessage = /Failed to fetch dynamically imported module/g;
    
    // Check if the error or its string conversion matches the chunk error
    if (chunkFailedMessage.test(error.message || error.toString())) {
      console.warn('Dynamic module fetch failed. Forcing page reload...');
      
      // Force a hard reload from the server, bypassing cache
      window.location.reload();
      return;
    }

    // Log other errors to the console normally
    console.error(error);
  }
}