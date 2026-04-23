import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KlptHeader } from '../../shared/klpt-header/klpt-header';

@Component({
  selector: 'app-testing-header',
  imports: [KlptHeader],
  templateUrl: './testing-header.html',
  styleUrl: './testing-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingHeader {
  readonly siteName = 'KLPT - Kindergarten Learning Progression Toolkit';

  example1Code = `<klpt-header
  brandType="coat-of-arms"
  siteName="${this.siteName}"
  showPreHeader="dark"
  [showSearch]="true"
  [showNavigation]="true">
</klpt-header>`;

  example2Code = `<klpt-header
  brandType="coat-of-arms"
  siteName="${this.siteName}"
  showPreHeader="none"
  [showSearch]="true"
  [showNavigation]="true">
</klpt-header>`;

  example3Code = `<klpt-header
  brandType="logo"
  siteName="${this.siteName}"
  showPreHeader="dark"
  [showSearch]="true"
  [showNavigation]="true">
</klpt-header>`;

  example4Code = `<klpt-header
  brandType="site-name"
  siteName="${this.siteName}"
  showPreHeader="none"
  [showSearch]="true"
  [showNavigation]="true">
</klpt-header>`;

  example5Code = `<klpt-header
  brandType="coat-of-arms"
  siteName="${this.siteName}"
  showPreHeader="dark"
  [showSearch]="false"
  [showNavigation]="false">
</klpt-header>`;

  example6Code = `<klpt-header
  brandType="coat-of-arms"
  siteName="${this.siteName}"
  showPreHeader="dark"
  [showSearch]="true"
  [showNavigation]="false">
</klpt-header>`;

  example7Code = `<klpt-header
  brandType="coat-of-arms"
  siteName="${this.siteName}"
  showPreHeader="none"
  [showSearch]="false"
  [showNavigation]="true">
</klpt-header>`;

  example8Code = `<klpt-header
  brandType="coat-of-arms"
  siteName="${this.siteName}"
  tagline="Kindergarten Learning Progression Toolkit"
  showPreHeader="dark"
  [showSearch]="true"
  [showNavigation]="true">
</klpt-header>`;

  example9Code = `<klpt-header
  brandType="coat-of-arms"
  siteName="${this.siteName}"
  showPreHeader="dark"
  [showSearch]="true"
  [showNavigation]="true"
  showSecondaryNav="true">
</klpt-header>`;

  example10Code = `<klpt-header
  brandType="coat-of-arms"
  siteName="${this.siteName}"
  showPreHeader="dark"
  [showSearch]="true"
  [showNavigation]="true"
  contained="true">
</klpt-header>`;
}
