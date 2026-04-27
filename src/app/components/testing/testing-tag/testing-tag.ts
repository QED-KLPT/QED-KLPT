import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QldTagComponent } from '../../shared/qld-tag/qld-tag.component';

@Component({
  selector: 'app-testing-tag',
  imports: [QldTagComponent],
  templateUrl: './testing-tag.html',
  styleUrl: './testing-tag.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingTag {
  handleClose(tag: string): void {
    console.log(`Removed filter tag: ${tag}`);
  }

  linkClick(event: Event, label: string): void {
    event.preventDefault();
    console.log(`Clicked link tag: ${label}`);
  }
}
