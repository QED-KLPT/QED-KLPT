import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SelectBoxComponent, SelectOption } from '../shared/select-box/select-box.component';

@Component({
  selector: 'app-testing-select',
  imports: [SelectBoxComponent],
  templateUrl: './testing-select.html',
  styleUrl: './testing-select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingSelect {
  defaultOptions: SelectOption[] = [
    { label: 'Please select', value: '' },
    { label: 'Option one', value: 'option1' },
    { label: 'Option two', value: 'option2' },
    { label: 'Option three', value: 'option3' },
  ];

  learningDomainOptions: SelectOption[] = [
    { label: 'Choose a learning domain...', value: '' },
    { label: 'Language and literacy', value: 'language-literacy' },
    { label: 'Executive function', value: 'executive-function' },
    { label: 'Social and emotional learning', value: 'social-emotional' },
    { label: 'Physicality', value: 'physicality' },
    { label: 'Mathematics and numeracy', value: 'mathematics-numeracy' },
  ];

  assessmentOptions: SelectOption[] = [
    { label: 'Select assessment type...', value: '' },
    { label: 'Initial observation', value: 'initial' },
    { label: 'Progress check', value: 'progress' },
    { label: 'Final assessment', value: 'final' },
  ];

  statusOptions: SelectOption[] = [
    { label: 'Choose a status...', value: '' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Pending review', value: 'pending' },
  ];

  priorityOptions: SelectOption[] = [
    { label: 'Select priority...', value: '' },
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];

  countryOptions: SelectOption[] = [
    { label: 'Choose a country...', value: '' },
    { label: 'Australia', value: 'australia' },
    { label: 'New Zealand', value: 'new-zealand' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'United States', value: 'us' },
  ];

  ageGroupOptions: SelectOption[] = [
    { label: 'Select age group...', value: '' },
    { label: '0-2 years', value: '0-2' },
    { label: '3-5 years', value: '3-5' },
    { label: '6-12 years', value: '6-12' },
    { label: '13+ years', value: '13-plus' },
  ];

  frequencyOptions: SelectOption[] = [
    { label: 'How often?', value: '' },
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ];

  sizeOptions: SelectOption[] = [
    { label: 'Select size...', value: '' },
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
  ];

  disabledOptions: SelectOption[] = [
    { label: 'Choose an option...', value: '' },
    { label: 'Option one', value: 'option1' },
    { label: 'Option two', value: 'option2' },
  ];

  errorOptions: SelectOption[] = [
    { label: 'Select a category...', value: '' },
    { label: 'Category A', value: 'a' },
    { label: 'Category B', value: 'b' },
  ];

  successOptions: SelectOption[] = [
    { label: 'Select a region...', value: '' },
    { label: 'Region North', value: 'north' },
    { label: 'Region South', value: 'south' },
  ];

  optionalOptions: SelectOption[] = [
    { label: 'Choose an option...', value: '' },
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
  ];

  requiredOptions: SelectOption[] = [
    { label: 'Select an option...', value: '' },
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];

  minimalOptions: SelectOption[] = [
    { label: 'Choose...', value: '' },
    { label: 'Alpha', value: 'alpha' },
    { label: 'Beta', value: 'beta' },
  ];

  complexFormDomainOptions: SelectOption[] = [
    { label: 'Choose domain...', value: '' },
    { label: 'Language and literacy', value: 'language-literacy' },
    { label: 'Executive function', value: 'executive-function' },
  ];

  complexFormAssessmentOptions: SelectOption[] = [
    { label: 'Choose assessment...', value: '' },
    { label: 'Initial observation', value: 'initial' },
    { label: 'Progress check', value: 'progress' },
  ];

  complexFormStatusOptions: SelectOption[] = [
    { label: 'Choose status...', value: '' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];
}
