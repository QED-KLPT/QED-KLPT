import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TextareaComponent } from '../../shared/textarea/textarea.component';

export interface TextareaDemoItem {
  label: string;
  hint?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  block?: boolean;
  optional?: boolean;
  required?: boolean;
  error?: string;
  success?: string;
}

@Component({
  selector: 'app-testing-textarea',
  imports: [TextareaComponent],
  templateUrl: './text-area.html',
  styleUrl: './text-area.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingTextarea {
  demo1Item: TextareaDemoItem = {
    label: 'Message',
  };

  demo2Item: TextareaDemoItem = {
    label: 'Message',
    placeholder: 'Enter your message here...',
  };

  demo3Item: TextareaDemoItem = {
    label: 'Feedback',
    required: true,
  };

  demo4Item: TextareaDemoItem = {
    label: 'Comments',
    optional: true,
  };

  demo5Item: TextareaDemoItem = {
    label: 'Additional Information',
    hint: 'Provide any extra details that might help us understand your request better.',
  };

  demo6Item: TextareaDemoItem = {
    label: 'Problem Description',
    error: 'Please describe the problem you are experiencing.',
  };

  demo7Item: TextareaDemoItem = {
    label: 'Resolution Notes',
    success: 'Your notes have been saved successfully.',
  };

  demo8Item: TextareaDemoItem = {
    label: 'Notes',
    disabled: true,
  };

  demo9Item: TextareaDemoItem = {
    label: 'Full-width Message',
    block: true,
  };

  demo10Item: TextareaDemoItem = {
    label: 'Detailed Feedback',
    hint: 'Include as much detail as possible to help us address your concerns.',
    error: 'A detailed description is required for us to investigate this issue.',
  };

  get demo3Required(): boolean {
    return true;
  }
}
