import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-working-memory',
  imports: [],
  templateUrl: './working-memory.html',
  styleUrl: './working-memory.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkingMemory {}
