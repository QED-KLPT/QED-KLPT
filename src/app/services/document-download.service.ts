import { Injectable, signal } from '@angular/core';

export interface DownloadNotification {
  url: string;
  filename: string;
  type: 'pdf' | 'docx';
}

@Injectable({ providedIn: 'root' })
export class DocumentDownloadService {
  readonly notification = signal<DownloadNotification | null>(null);

  set(data: DownloadNotification): void {
    const previous = this.notification();
    if (previous?.url) {
      URL.revokeObjectURL(previous.url);
    }
    this.notification.set(data);
  }

  clear(): void {
    const current = this.notification();
    if (current?.url) {
      URL.revokeObjectURL(current.url);
    }
    this.notification.set(null);
  }
}
