import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

interface SitemapNode {
  label: string;
  href?: string;
  children?: SitemapNode[];
}

@Component({
  selector: 'app-sitemap',
  imports: [RouterLink],
  templateUrl: './sitemap.html',
  styleUrl: './sitemap.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sitemap implements OnInit {
  constructor(private scroll: ViewportScroller) {}

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected readonly tree: SitemapNode[] = [
    {
      label: 'Foundations',
      href: '/foundations',
      children: [
        { label: 'Conducting and documenting quality observations', href: '/foundations/quality-observations' },
        { label: 'Analysing and interpreting observational data', href: '/foundations/analysing-data' },
      ],
    },
    {
      label: 'Learning domains',
      href: '/learning-domains',
      children: [
        { label: 'Language and literacy', href: '/learning-domains/language-and-literacy' },
        { label: 'Executive function', href: '/learning-domains/executive-function' },
        { label: 'Social and emotional learning', href: '/learning-domains/social-and-emotional-learning' },
        { label: 'Physicality', href: '/learning-domains/physicality' },
        { label: 'Mathematics and numeracy', href: '/learning-domains/mathematics-and-numeracy' },
      ],
    },
    {
      label: 'Practice supports',
      href: '/practice-supports',
    },
    {
      label: 'KLPT',
      href: '/klpt',
      children: [
        { label: 'KLPT introduction', href: '/klpt/introduction' },
        { label: 'KLPT sessions', href: '/klpt/list-sessions' },
        { label: 'Select KLPT domains', href: '/klpt/select-domains/:sessionId' },
        { label: 'Select KLPT behaviours', href: '/klpt/select-behaviours/:sessionId' },
        { label: 'Learning progression statement', href: '/klpt/learning-progression-statement/:sessionId' },
        { label: 'Review KLPT session', href: '/klpt/review-session/:sessionId' },
      ],
    },
    { label: 'About', href: '/about' },
    { label: 'Help', href: '/help' },
    { label: 'Contact', href: '/contact' },
  ];

  protected renderLink(node: SitemapNode): string {
    return node.href ?? '';
  }
}
