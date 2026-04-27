import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CheckboxComponent } from '../../shared/checkbox/checkbox.component';
import { RadioButtonComponent, RadioGroupComponent, RadioOption } from '../../shared/radio-button/radio-button.component';
import { SelectBoxComponent, SelectOption } from '../../shared/select-box/select-box.component';
import { TextareaComponent } from '../../shared/textarea/textarea.component';

export interface TextInputDemoItem {
  label: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  success?: string;
}

export interface AddressField {
  label: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
}

@Component({
  selector: 'app-testing-forms',
  imports: [CheckboxComponent, RadioGroupComponent, SelectBoxComponent, TextareaComponent],
  templateUrl: './testing-forms.html',
  styleUrl: './testing-forms.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingForms {
  demo1Item: TextInputDemoItem = {
    label: 'Email address',
  };

  demo2Item: TextInputDemoItem = {
    label: 'Tax file number',
    hint: 'Tax file numbers are 9 digits',
  };

  demo3Item: TextInputDemoItem = {
    label: 'Full name',
    required: true,
  };

  demo4Item: TextInputDemoItem = {
    label: 'Phone number',
    optional: true,
  };

  demo5Item: TextInputDemoItem = {
    label: 'Email address',
    error: 'Please enter a valid email address.',
  };

  demo6Item: TextInputDemoItem = {
    label: 'Email address',
    success: 'This email address is available.',
  };

  demo7Options: RadioOption[] = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];

  demo8Options: SelectOption[] = [
    { label: 'Choose an option...', value: '' },
    { label: 'Option one', value: 'option1' },
    { label: 'Option two', value: 'option2' },
    { label: 'Option three', value: 'option3' },
  ];

  demo9Fields: AddressField[] = [
    { label: 'Street address', placeholder: 'Enter your street address', required: true },
    { label: 'Unit or suite number (optional)', placeholder: 'Enter unit or suite', optional: true },
    { label: 'Suburb or locality', placeholder: 'Enter suburb or locality', required: true },
    { label: 'Postcode', placeholder: 'Enter postcode', required: true },
  ];

  demo10GenderOptions: RadioOption[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Non-binary', value: 'non-binary' },
    { label: 'Prefer not to say', value: 'prefer-not-to-say' },
  ];

  demo10DomainOptions: SelectOption[] = [
    { label: 'Choose a learning domain...', value: '' },
    { label: 'Language and literacy', value: 'language-literacy' },
    { label: 'Executive function', value: 'executive-function' },
    { label: 'Social and emotional learning', value: 'social-emotional' },
    { label: 'Physicality', value: 'physicality' },
    { label: 'Mathematics and numeracy', value: 'mathematics-numeracy' },
  ];

  demo10AssessmentOptions: SelectOption[] = [
    { label: 'Select assessment type...', value: '' },
    { label: 'Initial observation', value: 'initial' },
    { label: 'Progress check', value: 'progress' },
    { label: 'Final assessment', value: 'final' },
  ];

  get demo3Required(): boolean {
    return true;
  }

  get demo9PostcodeRequired(): boolean {
    return true;
  }

  get demo9SuburbRequired(): boolean {
    return true;
  }
}
