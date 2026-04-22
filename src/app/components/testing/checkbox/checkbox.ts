import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QldCheckboxComponent } from '../../shared/qld-checkbox/qld-checkbox.component';

export interface CheckboxDemoItem {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  optional?: boolean;
  required?: boolean;
  hint?: string;
  error?: string;
}

@Component({
  selector: 'app-testing-checkbox',
  imports: [QldCheckboxComponent],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingCheckbox {
  demo1Item: CheckboxDemoItem = {
    label: 'Agree to terms',
  };

  demo2Item: CheckboxDemoItem = {
    label: 'Subscribe to newsletter',
    checked: true,
  };

  demo3Item: CheckboxDemoItem = {
    label: 'I confirm the information is correct',
    required: true,
  };

  demo4Item: CheckboxDemoItem = {
    label: 'Receive marketing materials',
    optional: true,
  };

  demo5Item: CheckboxDemoItem = {
    label: 'Enable notifications',
    hint: 'You can change this setting at any time in your account preferences.',
  };

  demo6Item: CheckboxDemoItem = {
    label: 'Accept privacy policy',
    error: 'You must accept the privacy policy to continue.',
  };

  demo7Item: CheckboxDemoItem = {
    label: 'Terms verified',
    checked: true,
  };

  demo8Item: CheckboxDemoItem = {
    label: 'Disable this option',
    disabled: true,
  };

  demo9Item: CheckboxDemoItem = {
    label: 'Select all options',
    indeterminate: true,
  };

  demo10Item: CheckboxDemoItem = {
    label: 'Consent to data processing',
    required: true,
    hint: 'Your data will be processed in accordance with the GDPR regulations.',
    error: 'Consent is required to proceed with your application.',
  };

  get demo3Required(): boolean {
    return true;
  }
}
