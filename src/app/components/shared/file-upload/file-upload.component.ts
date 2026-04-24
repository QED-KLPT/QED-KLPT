import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export interface UploadedFile {
  file: File;
  status: 'loading' | 'complete' | 'success' | 'error';
  error?: string;
}

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  @Input({ required: true }) label!: string;
  @Input() hint = '';
  @Input() description: string[] = [];
  @Input() accept = '';
  @Input() maxSize = 0;
  @Input() maxFiles = 1;
  @Input() multiple = false;
  @Input() required = false;
  @Input() disabled = false;
  @Input() uploading = false;
  @Input() dark = false;

  @Output() filesSelected = new EventEmitter<File[]>();
  @Output() fileRemoved = new EventEmitter<number>();

  uploadedFiles: UploadedFile[] = [];
  isDragOver = false;

  get inputId(): string {
    return `file-upload-${Math.random().toString(36).substring(2, 9)}`;
  }

  get labelId(): string {
    return `${this.inputId}-label`;
  }

  get hintId(): string {
    return `${this.inputId}-hint`;
  }

  get descriptionIds(): string[] {
    return this.description.map((_, i) => `${this.inputId}-desc-${i}`);
  }

  get isDisabled(): boolean {
    return this.disabled || this.uploading;
  }

  get dropzoneClasses(): string {
    const classes = ['qld__form-file-dropzone'];
    if (this.isDragOver) {
      classes.push('qld__form-file-dropzone--dragged-over');
    }
    if (this.uploading) {
      classes.push('qld__form-file-dropzone--updating');
    }
    if (this.disabled) {
      classes.push('qld__form-file-dropzone--disabled');
    }
    return classes.join(' ');
  }

  get wrapperClasses(): string {
    const classes = ['qld__form-file-wrapper'];
    if (this.dark) {
      classes.push('qld__form-file-wrapper--dark');
    }
    return classes.join(' ');
  }

  get fileInputAttrs(): string {
    const attrs: string[] = ['type="file"'];
    if (this.accept) {
      attrs.push(`accept="${this.accept}"`);
    }
    if (this.multiple) {
      attrs.push('multiple="true"');
    }
    if (this.maxSize > 0) {
      attrs.push(`data-max-size="${this.maxSize}"`);
    }
    if (this.maxFiles > 1) {
      attrs.push(`data-max-files="${this.maxFiles}"`);
    }
    if (this.accept) {
      attrs.push(`data-file-types="${this.accept}"`);
    }
    return attrs.join(' ');
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      this.addFiles(files);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (!this.isDisabled) {
      this.isDragOver = true;
    }
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    if (this.isDisabled) return;

    const files = Array.from(event.dataTransfer?.files || []);
    this.addFiles(files);
  }

  private addFiles(files: File[]): void {
    const remainingSlots = this.maxFiles - this.uploadedFiles.length;

    if (remainingSlots <= 0) return;

    const filesToAdd = this.maxFiles > 1 ? files.slice(0, remainingSlots) : [files[0]];

    const newFiles: UploadedFile[] = filesToAdd.map((file) => ({
      file,
      status: 'loading',
    }));

    this.uploadedFiles = [...this.uploadedFiles, ...newFiles];
    this.filesSelected.emit(filesToAdd);

    this.simulateUpload(newFiles);
  }

  private simulateUpload(files: UploadedFile[]): void {
    files.forEach((uploadedFile, index) => {
      setTimeout(() => {
        uploadedFile.status = 'complete';

        const shouldSucceed = Math.random() > 0.15;
        if (shouldSucceed) {
          setTimeout(() => {
            uploadedFile.status = 'success';
          }, 1000);
        } else {
          uploadedFile.status = 'error';
          uploadedFile.error = 'The selected file could not be uploaded – try again.';
        }
      }, 1500 + index * 500);
    });
  }

  onFileRemoved(index: number): void {
    this.uploadedFiles.splice(index, 1);
    this.fileRemoved.emit(index);
  }

  onFileRetry(index: number): void {
    const uploadedFile = this.uploadedFiles[index];
    if (uploadedFile) {
      uploadedFile.status = 'loading';

      setTimeout(() => {
        const shouldSucceed = Math.random() > 0.2;
        if (shouldSucceed) {
          uploadedFile.status = 'success';
        } else {
          uploadedFile.status = 'error';
          uploadedFile.error = 'The selected file could not be uploaded – try again.';
        }
      }, 1500);
    }
  }

  getFileIconClass(file: File): string {
    const type = file.type || '';
    if (type.startsWith('image/')) return 'fa-light fa-file-image';
    if (type.includes('pdf')) return 'fa-light fa-file-pdf';
    if (type.includes('word') || type.includes('document')) return 'fa-light fa-file-word';
    if (type.includes('sheet') || type.includes('excel')) return 'fa-light fa-file-excel';
    if (type.includes('powerpoint') || type.includes('presentation')) return 'fa-light fa-file-powerpoint';
    if (type.includes('text') || type.includes('plain')) return 'fa-light fa-file-lines';
    if (type.includes('zip') || type.includes('rar') || type.includes('compress')) return 'fa-light fa-file-zipper';
    return 'fa-light fa-file';
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  truncateFileName(name: string, maxLength = 30): string {
    if (name.length <= maxLength) return name;
    const ext = name.lastIndexOf('.');
    if (ext > -1 && name.length - ext <= 6) {
      return name.substring(0, maxLength - 4) + '...' + name.substring(ext);
    }
    return name.substring(0, maxLength - 3) + '...';
  }

  getUploadButtonText(): string {
    if (this.maxFiles > 1) return 'Select files';
    return 'Select file';
  }

  getUploadHeadingText(): string {
    if (this.maxFiles > 1) return 'Drag and drop files here or select files to upload';
    return 'Drag and drop file here or select file to upload';
  }

  getConstraintsText(): string {
    const constraints: string[] = [];
    if (this.accept) {
      const types = this.accept.split(',').map((t) => t.trim());
      constraints.push(`Accepted file formats: ${types.join(', ')}`);
    }
    if (this.maxSize > 0) {
      constraints.push(`Maximum file size: ${this.maxSize}MB`);
    }
    if (this.maxFiles > 1) {
      constraints.push(`Maximum ${this.maxFiles} files`);
    } else if (this.maxFiles === 1) {
      constraints.push('Maximum 1 file');
    }
    return constraints.join('\n');
  }

  getConstraintsList(): string[] {
    const text = this.getConstraintsText();
    if (!text) return [];
    return text.split('\n');
  }

  get descriptionAriaIds(): string {
    return this.descriptionIds.join(' ');
  }

  get hintAriaId(): string | undefined {
    return this.hint ? this.hintId : undefined;
  }

  get inputAriaLabelledBy(): string {
    return this.labelId;
  }

  get inputAriaDescribedBy(): string | undefined {
    const parts: string[] = [];
    if (this.hint) parts.push(this.hintId);
    if (this.description.length > 0) parts.push(...this.descriptionIds);
    return parts.join(' ') || undefined;
  }

  get hasFiles(): boolean {
    return this.uploadedFiles.length > 0;
  }

  get loadingCount(): number {
    return this.uploadedFiles.filter((f) => f.status === 'loading').length;
  }

  get completeCount(): number {
    return this.uploadedFiles.filter((f) => f.status === 'complete' || f.status === 'success').length;
  }

  get errorCount(): number {
    return this.uploadedFiles.filter((f) => f.status === 'error').length;
  }

  get allComplete(): boolean {
    return this.uploadedFiles.length > 0 && this.uploadedFiles.every((f) => f.status === 'success');
  }

  get allUploaded(): boolean {
    return this.uploadedFiles.length > 0 && this.uploadedFiles.every((f) => f.status === 'complete' || f.status === 'success');
  }

  get totalFileSize(): string {
    const total = this.uploadedFiles.reduce((sum, f) => sum + f.file.size, 0);
    return this.formatFileSize(total);
  }

  getUploadStatusText(): string {
    if (this.uploading) return 'Uploading...';
    if (this.allComplete) return `${this.completeCount} file${this.completeCount > 1 ? 's' : ''} uploaded`;
    if (this.errorCount > 0) return `${this.errorCount} file${this.errorCount > 1 ? 's' : ''} with errors`;
    return '';
  }
}
