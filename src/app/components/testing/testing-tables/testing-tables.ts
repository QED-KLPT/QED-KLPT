import { ChangeDetectionStrategy, Component } from '@angular/core';

interface BasicTableRow {
  name: string;
  subject: string;
  status: string;
}

interface StripedTableRow {
  childName: string;
  skillArea: string;
  progressLevel: string;
}

interface NumericTableRow {
  month: string;
  enrollments: number;
  attendance: number;
  completionRate: number;
}

@Component({
  selector: 'app-testing-tables',
  imports: [],
  templateUrl: './testing-tables.html',
  styleUrl: './testing-tables.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingTables {
  // Example 1 & 2: Basic table data
  basicRows: BasicTableRow[] = [
    { name: 'Aiden M.', subject: 'Language and Literacy', status: 'Emerging' },
    { name: 'Brooklyn S.', subject: 'Executive Function', status: 'Developing' },
    { name: 'Carter J.', subject: 'Social and Emotional Learning', status: 'Secure' },
    { name: 'Daisy L.', subject: 'Physicality', status: 'Emerging' },
    { name: 'Ethan R.', subject: 'Mathematics and Numeracy', status: 'Developing' },
  ];

  // Example 3: Contained table data
  containedRows: BasicTableRow[] = [
    { name: 'Aiden M.', subject: 'Language and Literacy', status: 'Emerging' },
    { name: 'Brooklyn S.', subject: 'Executive Function', status: 'Developing' },
    { name: 'Carter J.', subject: 'Social and Emotional Learning', status: 'Secure' },
    { name: 'Daisy L.', subject: 'Physicality', status: 'Emerging' },
    { name: 'Ethan R.', subject: 'Mathematics and Numeracy', status: 'Developing' },
  ];

  // Example 4: Striped table data
  stripedRows: StripedTableRow[] = [
    { childName: 'Aiden M.', skillArea: 'Phonological Awareness', progressLevel: 'Emerging' },
    { childName: 'Brooklyn S.', skillArea: 'Working Memory', progressLevel: 'Developing' },
    { childName: 'Carter J.', skillArea: 'Turn-taking', progressLevel: 'Secure' },
    { childName: 'Daisy L.', skillArea: 'Gross Motor Skills', progressLevel: 'Emerging' },
    { childName: 'Ethan R.', skillArea: 'Number Recognition', progressLevel: 'Developing' },
    { childName: 'Fiona K.', skillArea: 'Emotional Regulation', progressLevel: 'Secure' },
    { childName: 'George T.', skillArea: 'Fine Motor Skills', progressLevel: 'Emerging' },
  ];

  // Example 5: Numeric data table
  numericRows: NumericTableRow[] = [
    { month: 'January', enrollments: 142, attendance: 128, completionRate: 90 },
    { month: 'February', enrollments: 156, attendance: 140, completionRate: 92 },
    { month: 'March', enrollments: 148, attendance: 135, completionRate: 91 },
    { month: 'April', enrollments: 163, attendance: 150, completionRate: 94 },
    { month: 'May', enrollments: 170, attendance: 158, completionRate: 95 },
    { month: 'June', enrollments: 165, attendance: 149, completionRate: 93 },
  ];

  // Example 6: Custom widths data
  customWidthRows: BasicTableRow[] = [
    { name: 'Aiden M.', subject: 'Language and Literacy', status: 'Emerging' },
    { name: 'Brooklyn S.', subject: 'Executive Function', status: 'Developing' },
    { name: 'Carter J.', subject: 'Social and Emotional Learning', status: 'Secure' },
    { name: 'Daisy L.', subject: 'Physicality', status: 'Emerging' },
    { name: 'Ethan R.', subject: 'Mathematics and Numeracy', status: 'Developing' },
  ];

  // Example 7: Multilevel headings data
  multilevelRows: { category: string; childName: string; score: string }[] = [
    { category: 'Language and Literacy', childName: 'Aiden M.', score: 'Emerging' },
    { category: '', childName: 'Brooklyn S.', score: 'Developing' },
    { category: '', childName: 'Carter J.', score: 'Secure' },
    { category: 'Executive Function', childName: 'Daisy L.', score: 'Emerging' },
    { category: '', childName: 'Ethan R.', score: 'Developing' },
    { category: '', childName: 'Fiona K.', score: 'Secure' },
  ];

  // Example 8: With caption and footer data
  captionRows: { name: string; date: string; assessor: string }[] = [
    { name: 'Aiden M.', date: '2025-03-15', assessor: 'Teacher A.' },
    { name: 'Brooklyn S.', date: '2025-03-18', assessor: 'Teacher B.' },
    { name: 'Carter J.', date: '2025-03-20', assessor: 'Teacher A.' },
    { name: 'Daisy L.', date: '2025-03-22', assessor: 'Teacher C.' },
  ];

  // Example 9: Scrollable wrapper data (many columns)
  scrollRows: { name: string; phonological: string; vocabulary: string; comprehension: string; writing: string; oralLanguage: string }[] = [
    { name: 'Aiden M.', phonological: 'Emerging', vocabulary: 'Developing', comprehension: 'Emerging', writing: 'Emerging', oralLanguage: 'Developing' },
    { name: 'Brooklyn S.', phonological: 'Developing', vocabulary: 'Secure', comprehension: 'Developing', writing: 'Emerging', oralLanguage: 'Secure' },
    { name: 'Carter J.', phonological: 'Secure', vocabulary: 'Secure', comprehension: 'Developing', writing: 'Developing', oralLanguage: 'Secure' },
    { name: 'Daisy L.', phonological: 'Emerging', vocabulary: 'Emerging', comprehension: 'Emerging', writing: 'Emerging', oralLanguage: 'Emerging' },
  ];

  // Example 10: Bordered columns data
  borderedRows: { name: string; domain: string; strand: string; level: string }[] = [
    { name: 'Aiden M.', domain: 'Language & Literacy', strand: 'Phonological Awareness', level: 'Emerging' },
    { name: 'Brooklyn S.', domain: 'Executive Function', strand: 'Working Memory', level: 'Developing' },
    { name: 'Carter J.', domain: 'Social & Emotional', strand: 'Turn-taking', level: 'Secure' },
    { name: 'Daisy L.', domain: 'Physicality', strand: 'Gross Motor', level: 'Emerging' },
    { name: 'Ethan R.', domain: 'Mathematics', strand: 'Number Sense', level: 'Developing' },
  ];
}
