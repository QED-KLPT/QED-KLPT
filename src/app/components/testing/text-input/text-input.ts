import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TextInputComponent } from '../../shared/text-input/text-input.component';

export interface TextInputDemoItem {
  label: string;
  hint?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'number' | 'password' | 'tel' | 'url';
  disabled?: boolean;
  block?: boolean;
  optional?: boolean;
  required?: boolean;
  error?: string;
  success?: string;
}

@Component({
  selector: 'app-testing-text-input',
  imports: [TextInputComponent],
  templateUrl: './text-input.html',
  styleUrl: './text-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingTextInput {
  demo1Item: TextInputDemoItem = {
    label: 'Full name',
  };

  demo2Item: TextInputDemoItem = {
    label: 'Email address',
    placeholder: 'e.g. john.smith@example.com',
    type: 'email',
  };

  demo3Item: TextInputDemoItem = {
    label: 'Phone number',
    placeholder: 'e.g. 04XX XXX XXX',
    type: 'tel',
  };

  demo4Item: TextInputDemoItem = {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
  };

  demo5Item: TextInputDemoItem = {
    label: 'Website',
    placeholder: 'https://example.com',
    type: 'url',
  };

  demo6Item: TextInputDemoItem = {
    label: 'Age',
    placeholder: 'Enter your age',
    type: 'number',
  };

  demo7Item: TextInputDemoItem = {
    label: 'Hint Text Example',
    hint: 'Enter your mobile number with the area code included.',
  };

  demo8Item: TextInputDemoItem = {
    label: 'Error State',
    placeholder: 'Enter your address',
    error: 'Please provide a valid street address.',
  };

  demo9Item: TextInputDemoItem = {
    label: 'Success State',
    placeholder: 'Enter your username',
    success: 'This username is available.',
  };

  demo10Item: TextInputDemoItem = {
    label: 'Disabled Field',
    placeholder: 'This field is disabled',
    disabled: true,
  };

  get demo3Required(): boolean {
    return true;
  }
}
