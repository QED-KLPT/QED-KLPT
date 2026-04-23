import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QldHeader } from '../../shared/qld-header/qld-header';

@Component({
  selector: 'app-testing-header',
  imports: [QldHeader],
  templateUrl: './testing-header.html',
  styleUrl: './testing-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingHeader {
  readonly siteName = 'KLPT - Kindergarten Learning Progression Toolkit';

  example1Code = `<qld-header
  brandType="coat-of-arms"
  siteName="${this.siteName}"
  showPreHeader="dark"
  [showSearch]="true"
  [showNavigation]="true">
</qld-header>`;

  example2Code = `<qld-header
  brandType="coat-of-arms"
  siteName="${this.siteName}"
  showPreHeader="none"
  [showSearch]="true"
  [showNavigation]="true">
</qld-header>`;

  example3Code = `<qld-header
  brandType="logo"
  siteName="${this.siteName}"
  showPreHeader="dark"
  [showSearch]="true"
  [showNavigation]="true">
</qld-header>`;

  example4Code = `<qld-header
  brandType="site-name"
  siteName="${this.siteName}"
  showPreHeader="none"
  [showSearch]="true"
  [showNavigation]="true">
</qld-header>`;

  example5Code = `<qld-header
  brandType="coat-of-arms"
  siteName="${this.siteName}"
  showPreHeader="dark"
  [showSearch]="false"
  [showNavigation]="false">
</qld-header>`;

  example6Code = `<qld-header
  brandType="coat-of-arms"
  siteName="${this.siteName}"
  showPreHeader="dark"
  [showSearch]="true"
  [showNavigation]="false">
</qld-header>`;

  example7Code = `<qld-header
  brandType="coat-of-arms"
  siteName="${this.siteName}"
  showPreHeader="none"
  [showSearch]="false"
  [showNavigation]="true">
</qld-header>`;

  example8Code = `<qld-header
  brandType="coat-of-arms"
  siteName="${this.siteName}"
  tagline="Kindergarten Learning Progression Toolkit"
  showPreHeader="dark"
  [showSearch]="true"
  [showNavigation]="true">
</qld-header>`;

  example9Code = `<qld-header
  brandType="coat-of-arms"
  siteName="${this.siteName}"
  showPreHeader="dark"
  [showSearch]="true"
  [showNavigation]="true"
  showSecondaryNav="true">
</qld-header>`;

  example10Code = `<qld-header
  brandType="coat-of-arms"
  siteName="${this.siteName}"
  showPreHeader="dark"
  [showSearch]="true"
  [showNavigation]="true"
  contained="true">
</qld-header>`;
}
