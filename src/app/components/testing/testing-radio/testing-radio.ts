import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RadioGroupComponent, RadioOption } from '../../shared/radio-button/radio-button.component';

@Component({
  selector: 'app-testing-radio',
  imports: [RadioGroupComponent],
  templateUrl: './testing-radio.html',
  styleUrl: './testing-radio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingRadio {
  defaultOptions: RadioOption[] = [
    { label: 'Laptop', value: 'laptop' },
    { label: 'Phone', value: 'phone' },
    { label: 'Tablet', value: 'tablet' },
  ];


  smallOptions: RadioOption[] = [
    { label: 'Laptop', value: 'laptop' },
    { label: 'Phone', value: 'phone' },
    { label: 'Tablet', value: 'tablet' },
  ];


  inlineOptions: RadioOption[] = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
    { label: 'Unsure', value: 'unsure' },
  ];


  validOptions: RadioOption[] = [
    { label: 'Laptop', value: 'laptop' },
    { label: 'Phone', value: 'phone' },
    { label: 'Tablet', value: 'tablet' },
  ];


  errorOptions: RadioOption[] = [
    { label: 'Laptop', value: 'laptop' },
    { label: 'Phone', value: 'phone' },
    { label: 'Tablet', value: 'tablet' },
  ];


  disabledOptions: RadioOption[] = [
    { label: 'Laptop', value: 'laptop' },
    { label: 'Phone', value: 'phone' },
    { label: 'Tablet', value: 'tablet' },
  ];


  optionalOptions: RadioOption[] = [
    { label: 'Laptop', value: 'laptop' },
    { label: 'Phone', value: 'phone' },
    { label: 'Tablet', value: 'tablet' },
  ];


  mixedOptions: RadioOption[] = [
    { label: 'Laptop', value: 'laptop' },
    { label: 'Phone (unavailable)', value: 'phone', disabled: true },
    { label: 'Tablet', value: 'tablet' },
  ];


  requiredNoHintOptions: RadioOption[] = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
  ];


  minimalOptions: RadioOption[] = [
    { label: 'Agree', value: 'agree' },
    { label: 'Disagree', value: 'disagree' },
  ];
}
