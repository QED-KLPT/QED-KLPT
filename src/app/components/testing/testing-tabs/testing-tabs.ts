import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-testing-tabs',
  imports: [],
  templateUrl: './testing-tabs.html',
  styleUrl: './testing-tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingTabs {
  codeExamples = [
    // Example 1: Basic tabs with text labels
    `&lt;div class="qld__tab-container"&gt;
  &lt;div class="qld__tabs" role="tablist"&gt;
    &lt;button role="tab" class="qld__tab-button active"
      aria-selected="true" tabindex="0"&gt;Tab 1&lt;/button&gt;
    &lt;button role="tab" class="qld__tab-button"
      aria-selected="false" tabindex="-1"&gt;Tab 2&lt;/button&gt;
    &lt;button role="tab" class="qld__tab-button"
      aria-selected="false" tabindex="-1"&gt;Tab 3&lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="qld__tab-content active" role="tabpanel"&gt;Content 1&lt;/div&gt;
  &lt;div class="qld__tab-content" role="tabpanel"&gt;Content 2&lt;/div&gt;
  &lt;div class="qld__tab-content" role="tabpanel"&gt;Content 3&lt;/div&gt;
&lt;/div&gt;`,

    // Example 2: Tabs with icons
    `&lt;div class="qld__tab-container"&gt;
  &lt;div class="qld__tabs" role="tablist"&gt;
    &lt;button role="tab" class="qld__tab-button active"&gt;
      &lt;i class="fa-regular fa-circle-info"&gt;&lt;/i&gt;Overview&lt;/button&gt;
    &lt;button role="tab" class="qld__tab-button"&gt;
      &lt;i class="fa-regular fa-pen-ruler"&gt;&lt;/i&gt;Design&lt;/button&gt;
    &lt;button role="tab" class="qld__tab-button"&gt;
      &lt;i class="fa-regular fa-code"&gt;&lt;/i&gt;Code&lt;/button&gt;
  &lt;/div&gt;
  &lt;!-- tab panels --&gt;
&lt;/div&gt;`,

    // Example 3: Dark themed tabs
    `&lt;section class="qld__body qld__body--full-width qld__tab-section"&gt;
  &lt;div class="qld__tab-container qld__tab-container__dark"&gt;
    &lt;div class="qld__tabs" role="tablist"&gt;
      &lt;button role="tab" class="qld__tab-button active"&gt;Section 1&lt;/button&gt;
      &lt;button role="tab" class="qld__tab-button"&gt;Section 2&lt;/button&gt;
    &lt;/div&gt;
    &lt;!-- tab panels --&gt;
  &lt;/div&gt;
&lt;/section&gt;`,

    // Example 4: Two tabs (minimal)
    `&lt;div class="qld__tab-container"&gt;
  &lt;div class="qld__tabs" role="tablist"&gt;
    &lt;button role="tab" class="qld__tab-button active"&gt;Summary&lt;/button&gt;
    &lt;button role="tab" class="qld__tab-button"&gt;Details&lt;/button&gt;
  &lt;/div&gt;
  &lt;!-- tab panels --&gt;
&lt;/div&gt;`,

    // Example 5: Five tabs
    `&lt;div class="qld__tab-container"&gt;
  &lt;div class="qld__tabs" role="tablist"&gt;
    &lt;button role="tab" class="qld__tab-button active"&gt;Personal&lt;/button&gt;
    &lt;button role="tab" class="qld__tab-button"&gt;Education&lt;/button&gt;
    &lt;button role="tab" class="qld__tab-button"&gt;Experience&lt;/button&gt;
    &lt;button role="tab" class="qld__tab-button"&gt;Skills&lt;/button&gt;
    &lt;button role="tab" class="qld__tab-button"&gt;References&lt;/button&gt;
  &lt;/div&gt;
  &lt;!-- tab panels --&gt;
&lt;/div&gt;`,

    // Example 6: Section tabs (full-width, dark background)
    `&lt;section class="qld__body qld__body--full-width qld__tab-section"&gt;
  &lt;div class="container-fluid"&gt;
    &lt;div class="qld__tab-container qld__tab-container__fixed qld__tab-container__dark"&gt;
      &lt;div class="qld__tabs" role="tablist"&gt;
        &lt;button role="tab" class="qld__tab-button active"&gt;Domain 1&lt;/button&gt;
        &lt;button role="tab" class="qld__tab-button"&gt;Domain 2&lt;/button&gt;
        &lt;button role="tab" class="qld__tab-button"&gt;Domain 3&lt;/button&gt;
      &lt;/div&gt;
      &lt;!-- tab panels --&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/section&gt;`,

    // Example 7: Tabs with long labels (scrollable)
    `&lt;div class="qld__tab-container"&gt;
  &lt;div class="qld__tabs" role="tablist"&gt;
    &lt;button role="tab" class="qld__tab-button active"&gt;
      Very Long Tab Label One&lt;/button&gt;
    &lt;button role="tab" class="qld__tab-button"&gt;
      Another Long Tab Label Two&lt;/button&gt;
    &lt;button role="tab" class="qld__tab-button"&gt;
      Yet Another Long Tab Label Three&lt;/button&gt;
    &lt;button role="tab" class="qld__tab-button"&gt;
      Extra Long Tab Label Four&lt;/button&gt;
  &lt;/div&gt;
  &lt;!-- tab panels --&gt;
&lt;/div&gt;`,

    // Example 8: Tabs with rich content (headings, paragraphs, lists)
    `&lt;div class="qld__tab-container"&gt;
  &lt;div class="qld__tabs" role="tablist"&gt;
    &lt;button role="tab" class="qld__tab-button active"&gt;Overview&lt;/button&gt;
    &lt;button role="tab" class="qld__tab-button"&gt;Guidelines&lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="qld__tab-content active" role="tabpanel"&gt;
    &lt;h3&gt;Tab Heading&lt;/h3&gt;
    &lt;p&gt;Paragraph content goes here.&lt;/p&gt;
  &lt;/div&gt;
  &lt;div class="qld__tab-content" role="tabpanel"&gt;
    &lt;h3&gt;Guidelines&lt;/h3&gt;
    &lt;ul&gt;&lt;li&gt;Item one&lt;/li&gt;&lt;li&gt;Item two&lt;/li&gt;&lt;/ul&gt;
  &lt;/div&gt;
&lt;/div&gt;`,

    // Example 9: Tabs with links and buttons in content
    `&lt;div class="qld__tab-container"&gt;
  &lt;div class="qld__tabs" role="tablist"&gt;
    &lt;button role="tab" class="qld__tab-button active"&gt;Actions&lt;/button&gt;
    &lt;button role="tab" class="qld__tab-button"&gt;Resources&lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="qld__tab-content active" role="tabpanel"&gt;
    &lt;p&gt;&lt;a href="#"&gt;View details&lt;/a&gt;&lt;/p&gt;
    &lt;button type="button"&gt;Primary Action&lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="qld__tab-content" role="tabpanel"&gt;
    &lt;p&gt;&lt;a href="#"&gt;Download guide&lt;/a&gt;&lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;`,

    // Example 10: Tabs with table in content
    `&lt;div class="qld__tab-container"&gt;
  &lt;div class="qld__tabs" role="tablist"&gt;
    &lt;button role="tab" class="qld__tab-button active"&gt;Data A&lt;/button&gt;
    &lt;button role="tab" class="qld__tab-button"&gt;Data B&lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="qld__tab-content active" role="tabpanel"&gt;
    &lt;table class="qld__table"&gt;
      &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Name&lt;/th&gt;&lt;th&gt;Value&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;
      &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Item 1&lt;/td&gt;&lt;td&gt;100&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;
    &lt;/table&gt;
  &lt;/div&gt;
  &lt;div class="qld__tab-content" role="tabpanel"&gt;
    &lt;table class="qld__table"&gt;
      &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Name&lt;/th&gt;&lt;th&gt;Value&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;
      &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Item 2&lt;/td&gt;&lt;td&gt;200&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;
    &lt;/table&gt;
  &lt;/div&gt;
&lt;/div&gt;`
  ];

  descriptions = [
    'Basic tabs with three text-only labels. The simplest form of the tab component, used for organizing content into two or more categories.',
    'Tabs with leading icons from Font Awesome. Icons help users quickly identify tab content and improve visual scanning.',
    'Dark themed tabs designed for use on dark backgrounds, typically placed after a dark banner or section. The active tab indicator is white.',
    'Minimal two-tab layout for simple binary choices like Summary/Details or Overview/Settings.',
    'Five-tab layout demonstrating the component with more categories. Tabs remain horizontally scrollable on smaller screens.',
    'Full-width section tabs placed in a dark container, commonly used below banners for major content area navigation.',
    'Tabs with long labels that overflow the container. The tab list scrolls horizontally on small screens.',
    'Tabs with rich content including headings, paragraphs, and lists in the tab panels.',
    'Tabs containing interactive elements like links and buttons within their content panels.',
    'Tabs displaying tabular data, demonstrating the component with structured content in each panel.'
  ];

  titles = [
    'Basic Tabs (Text Only)',
    'Tabs with Icons',
    'Dark Themed Tabs',
    'Minimal Two-Tab Layout',
    'Five-Tab Layout',
    'Full-Width Section Tabs',
    'Long Label Tabs (Scrollable)',
    'Tabs with Rich Content',
    'Tabs with Interactive Elements',
    'Tabs with Tabular Data'
  ];

  // Active tab state for each example (0-9)
  activeTabs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  selectTab(exampleIndex: number, tabIndex: number): void {
    this.activeTabs[exampleIndex] = tabIndex;
  }

  getTabButtonClasses(exampleIndex: number, tabIndex: number): string {
    const base = 'qld__tab-button';
    return this.activeTabs[exampleIndex] === tabIndex ? (base + ' active') : base;
  }

  getTabContentClasses(exampleIndex: number, tabIndex: number): string {
    const base = 'qld__tab-content';
    return this.activeTabs[exampleIndex] === tabIndex ? (base + ' active') : base;
  }

  getTabCount(exampleIndex: number): number {
    const counts = [3, 3, 2, 2, 5, 3, 4, 2, 2, 2];
    return counts[exampleIndex] ?? 3;
  }

  getTabLabels(exampleIndex: number): string[] {
    const labels: string[][] = [
      ['Overview', 'Details', 'Settings'],
      ['Overview', 'Design', 'Code'],
      ['Section 1', 'Section 2'],
      ['Summary', 'Details'],
      ['Personal', 'Education', 'Experience', 'Skills', 'References'],
      ['Domain 1', 'Domain 2', 'Domain 3'],
      ['Very Long Tab Label One', 'Another Long Tab Label Two', 'Yet Another Long Tab Label Three', 'Extra Long Tab Label Four'],
      ['Overview', 'Guidelines'],
      ['Actions', 'Resources'],
      ['Data A', 'Data B']
    ];
    return labels[exampleIndex] ?? [];
  }

  getTabContentHtml(exampleIndex: number): string[] {
    const contents = [
      // Example 0: Basic tabs
      [
        '<h3>Overview</h3><p>This is the overview tab content. It contains general information about the topic.</p>',
        '<h3>Details</h3><p>This is the details tab content. It provides more in-depth information.</p>',
        '<h3>Settings</h3><p>This is the settings tab content. Configure your preferences here.</p>'
      ],
      // Example 1: Tabs with icons
      [
        '<h3>Overview</h3><p>The overview tab provides a high-level summary of the topic and its key concepts.</p>',
        '<h3>Design</h3><p>The design tab covers the principles and patterns used in creating this component.</p>',
        '<h3>Code</h3><p>The code tab shows implementation examples and best practices.</p>'
      ],
      // Example 2: Dark themed tabs
      [
        '<h3>Section One</h3><p>This content appears in the first section of dark-themed tabs.</p>',
        '<h3>Section Two</h3><p>This content appears in the second section of dark-themed tabs.</p>'
      ],
      // Example 3: Two tabs
      [
        '<h3>Summary</h3><p>A brief summary of the key points covered in this section.</p>',
        '<h3>Details</h3><p>Detailed information expanding on the summary points above.</p>'
      ],
      // Example 4: Five tabs
      [
        '<h3>Personal</h3><p>Personal information and background details.</p>',
        '<h3>Education</h3><p>Educational qualifications and academic achievements.</p>',
        '<h3>Experience</h3><p>Professional experience and work history.</p>',
        '<h3>Skills</h3><p>Technical and soft skills inventory.</p>',
        '<h3>References</h3><p>Professional references and testimonials.</p>'
      ],
      // Example 5: Section tabs
      [
        '<h3>Domain One</h3><p>Content for the first domain area. This section covers foundational concepts and principles.</p>',
        '<h3>Domain Two</h3><p>Content for the second domain area. This section explores advanced topics and applications.</p>',
        '<h3>Domain Three</h3><p>Content for the third domain area. This section provides practical guidance and resources.</p>'
      ],
      // Example 6: Long labels
      [
        '<h3>Very Long Tab Label One</h3><p>This panel demonstrates tabs with extended label text that may overflow on smaller viewports.</p>',
        '<h3>Another Long Tab Label Two</h3><p>The horizontal scroll allows users to access all tabs even when labels are lengthy.</p>',
        '<h3>Yet Another Long Tab Label Three</h3><p>Consider keeping tab labels concise for the best user experience across all devices.</p>',
        '<h3>Extra Long Tab Label Four</h3><p>If labels consistently exceed available space, consider alternative navigation patterns.</p>'
      ],
      // Example 7: Rich content
      [
        '<h3>Overview</h3><p>This tab contains rich formatted content including headings, paragraphs, and lists to demonstrate the component\'s flexibility.</p><ul><li>First list item</li><li>Second list item</li><li>Third list item</li></ul>',
        '<h3>Guidelines</h3><p>Usage guidelines for when to use tabs versus other navigation patterns.</p><ol><li>Group related content</li><li>Keep labels short</li><li>Show first tab by default</li></ol>'
      ],
      // Example 8: Interactive elements
      [
        '<h3>Actions</h3><p>Perform actions from within the tab content.</p><p><a href="#">View detailed report</a></p><button type="button" style="margin-top:0.5rem;padding:0.5rem 1rem;background:#005eb8;color:#fff;border:none;border-radius:4px;cursor:pointer;">Primary Action</button>',
        '<h3>Resources</h3><p>Access additional resources and documentation.</p><p><a href="#">Download PDF guide</a></p><p><a href="#">Watch tutorial video</a></p>'
      ],
      // Example 9: Tabular data
      [
        '<h3>Data Set A</h3><table class="qld__table"><thead><tr><th>Category</th><th>Q1</th><th>Q2</th><th>Q3</th></tr></thead><tbody><tr><td>Language &amp; Literacy</td><td>85%</td><td>88%</td><td>92%</td></tr><tr><td>Executive Function</td><td>78%</td><td>82%</td><td>87%</td></tr></tbody></table>',
        '<h3>Data Set B</h3><table class="qld__table"><thead><tr><th>Category</th><th>Q1</th><th>Q2</th><th>Q3</th></tr></thead><tbody><tr><td>Social &amp; Emotional</td><td>90%</td><td>91%</td><td>95%</td></tr><tr><td>Physicality</td><td>82%</td><td>85%</td><td>89%</td></tr></tbody></table>'
      ]
    ];
    return contents[exampleIndex] ?? [];
  }
}
