import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QldCalloutComponent } from '../shared/qld-callout/qld-callout.component';

@Component({
  selector: 'app-testing-callout',
  imports: [QldCalloutComponent],
  templateUrl: './testing-callout.html',
  styleUrl: './testing-callout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingCallout {
  defaultTitle = 'Important Notice';
  defaultMessage = 'This is a callout with the default palette. It uses the standard blue accent color and light background to draw attention to key information.';

  lightTitle = 'Updated Information';
  lightMessage = 'This callout uses the light palette variant, which has a softer background shade. Useful for less prominent but still important information.';

  altTitle = 'General Information';
  altMessage = 'The alt palette uses a neutral grey tone. This is ideal for supplementary information that does not need strong visual emphasis.';

  darkTitle = 'System Maintenance';
  darkMessage = 'This callout uses the dark palette with a blue background and white text. It creates strong visual contrast for critical announcements.';

  darkAltTitle = 'Scheduled Downtime';
  darkAltMessage = 'The dark-alt variant uses a deeper blue background. This is the most visually prominent palette option for urgent notifications.';

  srTitle = 'Accessibility Heading';
  srMessage = 'This callout has a screen-reader-only heading. The title is hidden visually but remains available to assistive technologies.';

  linkTitle = 'External Resources';
  linkMessage = 'Callouts can contain links. Visit the <a href="#">QLD Government website</a> for more information about accessibility standards and guidelines.';

  multiParaTitle = 'Detailed Guidance';
  multiContent = `<p>This callout contains multiple paragraphs of content. The first paragraph introduces the topic and provides context for the reader.</p>
<p>The second paragraph expands on the details and may include additional information, examples, or references to related resources.</p>
<p>You can use <code>&lt;ng-content&gt;</code> to project any HTML content into the callout, including lists, links, and formatted text.</p>`;

  emptyTitle = 'Minimal Callout';
  emptyMessage = '';

  checklistContent = `<ul>
    <li>Review the assessment criteria</li>
    <li>Gather evidence from recent observations</li>
    <li>Discuss findings with the teaching team</li>
    <li>Update the learning progression record</li>
  </ul>`;

  checklistTitle = 'Assessment Checklist';
}
