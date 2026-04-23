import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileUploadComponent } from '../shared/file-upload/file-upload.component';

@Component({
  selector: 'app-testing-file-upload',
  imports: [FileUploadComponent],
  templateUrl: './testing-file-upload.html',
  styleUrl: './testing-file-upload.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingFileUpload {
  example1Files: File[] = [];
  example2Files: File[] = [];
  example3Files: File[] = [];
  example4Files: File[] = [];
  example5Files: File[] = [];
  example6Files: File[] = [];
  example7Files: File[] = [];
  example8Files: File[] = [];
  example9Files: File[] = [];
  example10Files: File[] = [];

  example2Description = ['Accepted file formats: .jpg, .jpeg, .png, .gif', 'Maximum file size: 5MB'];
  example3Description = ['Accepted file formats: .docx, .pdf, .xlsx', 'Maximum 5 files'];
  example4Description = ['Accepted file formats: .pdf, .docx', 'Maximum file size: 10MB'];
  example5Description = ['Accepted file formats: .pdf, .jpg, .png', 'Maximum file size: 5MB'];
  example6Description = ['Accepted file formats: .mp4, .mov', 'Maximum file size: 50MB'];
  example7Description = ['Accepted file formats: .csv, .xlsx', 'Maximum file size: 20MB'];
  example8Description = ['Accepted file formats: .pdf, .docx', 'Maximum file size: 15MB'];
  example9Description = ['Accepted file formats: .jpg, .png, .svg', 'Maximum file size: 10MB'];
  example10Description = ['Accepted file formats: .pdf, .docx, .xlsx', 'Maximum 3 files'];

  onExample1Files(files: File[]): void {
    this.example1Files = files;
  }

  onExample2Files(files: File[]): void {
    this.example2Files = files;
  }

  onExample3Files(files: File[]): void {
    this.example3Files = files;
  }

  onExample4Files(files: File[]): void {
    this.example4Files = files;
  }

  onExample5Files(files: File[]): void {
    this.example5Files = files;
  }

  onExample6Files(files: File[]): void {
    this.example6Files = files;
  }

  onExample7Files(files: File[]): void {
    this.example7Files = files;
  }

  onExample8Files(files: File[]): void {
    this.example8Files = files;
  }

  onExample9Files(files: File[]): void {
    this.example9Files = files;
  }

  onExample10Files(files: File[]): void {
    this.example10Files = files;
  }

  onExample1Removed(index: number): void {
    console.log('Example 1 file removed at index:', index);
  }

  onExample2Removed(index: number): void {
    console.log('Example 2 file removed at index:', index);
  }

  onExample3Removed(index: number): void {
    console.log('Example 3 file removed at index:', index);
  }

  onExample4Removed(index: number): void {
    console.log('Example 4 file removed at index:', index);
  }

  onExample5Removed(index: number): void {
    console.log('Example 5 file removed at index:', index);
  }

  onExample6Removed(index: number): void {
    console.log('Example 6 file removed at index:', index);
  }

  onExample7Removed(index: number): void {
    console.log('Example 7 file removed at index:', index);
  }

  onExample8Removed(index: number): void {
    console.log('Example 8 file removed at index:', index);
  }

  onExample9Removed(index: number): void {
    console.log('Example 9 file removed at index:', index);
  }

  onExample10Removed(index: number): void {
    console.log('Example 10 file removed at index:', index);
  }

  onExample1Retry(index: number): void {
    console.log('Example 1 file retry at index:', index);
  }

  onExample2Retry(index: number): void {
    console.log('Example 2 file retry at index:', index);
  }

  onExample3Retry(index: number): void {
    console.log('Example 3 file retry at index:', index);
  }

  onExample4Retry(index: number): void {
    console.log('Example 4 file retry at index:', index);
  }

  onExample5Retry(index: number): void {
    console.log('Example 5 file retry at index:', index);
  }

  onExample6Retry(index: number): void {
    console.log('Example 6 file retry at index:', index);
  }

  onExample7Retry(index: number): void {
    console.log('Example 7 file retry at index:', index);
  }

  onExample8Retry(index: number): void {
    console.log('Example 8 file retry at index:', index);
  }

  onExample9Retry(index: number): void {
    console.log('Example 9 file retry at index:', index);
  }

  onExample10Retry(index: number): void {
    console.log('Example 10 file retry at index:', index);
  }
}
