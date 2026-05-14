import { Routes } from '@angular/router';
import { About } from './components/about/about';
import { AnalysingData } from './components/analysing-data/analysing-data';
import { Contact } from './components/contact/contact';
import { Help } from './components/help/help';
import { ExecutiveFunction } from './components/executive-function/executive-function';
import { Foundations } from './components/foundations/foundations';
import { Home } from './components/home/home';
import { LanguageAndLiteracy } from './components/language-and-literacy/language-and-literacy';
import { LearningDomains } from './components/learning-domains/learning-domains';
import { MathematicsAndNumeracy } from './components/mathematics-and-numeracy/mathematics-and-numeracy';
import { Physicality } from './components/physicality/physicality';
import { PracticeSupports } from './components/practice-supports/practice-supports';

import { QualityObservations } from './components/quality-observations/quality-observations';
import { SocialAndEmotionalLearning } from './components/social-and-emotional-learning/social-and-emotional-learning';
import { TestingAlerts } from './components/testing/testing-alerts/testing-alerts';
import { TestingAccordians } from './components/testing/testing-accordians/testing-accordians';
import { TestingTextarea } from './components/testing/text-area/text-area';
import { TestingCheckbox } from './components/testing/checkbox/checkbox';
import { TestingTextInput } from './components/testing/text-input/text-input';
import { Testing } from './components/testing/testing';
import { TestingCards } from './components/testing/testing-cards/testing-cards';
import { TestingTabs } from './components/testing/testing-tabs/testing-tabs';
import { TestingPromotionalPanel } from './components/testing/testing-promotional-panel/testing-promotional-panel';
import { TestingBanner } from './components/testing/testing-banner/testing-banner';
import { TestingButtons } from './components/testing/testing-buttons/testing-buttons';
import { TestingBreadcrumbs } from './components/testing/testing-breadcrumbs/testing-breadcrumbs';
import { TestingCallout } from './components/testing/testing-callout/testing-callout';
import { TestingDirectionLinks } from './components/testing/testing-direction-links/testing-direction-links';
import { TestingFileUpload } from './components/testing/testing-file-upload/testing-file-upload';
import { TestingFooter } from './components/testing/testing-footer/testing-footer';
import { TestingForms } from './components/testing/testing-forms/testing-forms';
import { TestingGlobalAlert } from './components/testing/testing-global-alert/testing-global-alert';
import { TestingInPageAlert } from './components/testing/testing-in-page-alert/testing-in-page-alert';
import { TestingHeader } from './components/testing/testing-header/testing-header';
import { TestingLoadingSpinner } from './components/testing/testing-loading-spinner/testing-loading-spinner';
import { TestingHorizontalRule } from './components/testing/testing-horizontal-rule/testing-horizontal-rule';
import { TestingNavigationalHorizontal } from './components/testing/testing-navigational-horizontal/testing-navigational-horizontal';
import { TestingInPageNav } from './components/testing/testing-in-page-nav/testing-in-page-nav';
import { TestingNavigationVertical } from './components/testing/testing-navigation-vertical/testing-navigation-vertical';
import { TestingNavigation } from './components/testing/testing-navigation/testing-navigation';
import { TestingRadio } from './components/testing/testing-radio/testing-radio';
import { TestingSelect } from './components/testing/testing-select/testing-select';
import { TestingTables } from './components/testing/testing-tables/testing-tables';
import { TestingTag } from './components/testing/testing-tag/testing-tag';
import { TestingSideNavigation } from './components/testing/testing-side-navigation/testing-side-navigation';


export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'foundations', component: Foundations, title: 'Foundations' },
  { path: 'foundations/quality-observations', component: QualityObservations, title: 'Conducting and documenting quality observations' },
  { path: 'foundations/analysing-data', component: AnalysingData, title: 'Analysing and interpreting observational data' },
  { path: 'learning-domains', component: LearningDomains, title: 'Learning domains' },
  { path: 'learning-domains/language-and-literacy', component: LanguageAndLiteracy, title: 'Language and literacy' },
  { path: 'learning-domains/executive-function', component: ExecutiveFunction, title: 'Executive function' },  
  {
    path: 'learning-domains/social-and-emotional-learning',
    component: SocialAndEmotionalLearning,
    title: 'Social and emotional learning',
  },
  { path: 'learning-domains/physicality', component: Physicality, title: 'Physicality' },  
  {
    path: 'learning-domains/mathematics-and-numeracy',
    component: MathematicsAndNumeracy,
    title: 'Mathematics and numeracy',
  },
  { path: 'practice-supports', component: PracticeSupports, title: 'Practice supports' },
  {
    path: 'klpt',
    loadChildren: () => import('./components/klpt/klpt-routing.module').then((m) => m.KlptRoutingModule),
  },
  { path: 'about', component: About, title: 'About' },
  { path: 'help', component: Help, title: 'Help' },
  { path: 'contact', component: Contact, title: 'Contact' },
  { path: 'testing-alerts', component: TestingAlerts, title: 'Testing Alerts' },
  { path: 'testing-accordians', component: TestingAccordians, title: 'Testing Accordions' },
  { path: 'testing-text-area', component: TestingTextarea, title: 'Testing Text Area' },
  { path: 'testing-text-input', component: TestingTextInput, title: 'Testing Text Input' },
  { path: 'testing-checkbox', component: TestingCheckbox, title: 'Testing Checkbox' },
  { path: 'testing', component: Testing, title: 'Testing Hub' },
  { path: 'testing/testing-cards', component: TestingCards, title: 'Testing Cards' },
  { path: 'testing/testing-tabs', component: TestingTabs, title: 'Testing Tabs' },
  { path: 'testing/testing-promotional-panel', component: TestingPromotionalPanel, title: 'Testing Promotional Panel' },
  { path: 'testing/testing-banner', component: TestingBanner, title: 'Testing Banner' },
  { path: 'testing/testing-buttons', component: TestingButtons, title: 'Testing Buttons' },
  { path: 'testing/testing-breadcrumbs', component: TestingBreadcrumbs, title: 'Testing Breadcrumbs' },
  { path: 'testing/testing-callout', component: TestingCallout, title: 'Testing Callout' },
  { path: 'testing/testing-direction-links', component: TestingDirectionLinks, title: 'Testing Direction Links' },
  { path: 'testing/testing-file-upload', component: TestingFileUpload, title: 'Testing File Upload' },
  { path: 'testing/testing-footer', component: TestingFooter, title: 'Testing Footer' },
  { path: 'testing/testing-forms', component: TestingForms, title: 'Testing Forms' },
  { path: 'testing/testing-global-alert', component: TestingGlobalAlert, title: 'Testing Global Alert' },
  { path: 'testing/testing-in-page-alert', component: TestingInPageAlert, title: 'Testing In-Page Alert' },
  { path: 'testing/testing-header', component: TestingHeader, title: 'Testing Header' },
  { path: 'testing/testing-loading-spinner', component: TestingLoadingSpinner, title: 'Testing Loading Spinner' },
  { path: 'testing/testing-horizontal-rule', component: TestingHorizontalRule, title: 'Testing Horizontal Rule' },
  { path: 'testing/testing-navigation', component: TestingNavigation, title: 'Testing Navigation' },
  { path: 'testing/testing-navigational-horizontal', component: TestingNavigationalHorizontal, title: 'Testing Navigational Horizontal' },
  { path: 'testing/testing-in-page-navigation', component: TestingInPageNav, title: 'Testing In-Page Navigation' },
  { path: 'testing/testing-navigation-vertical', component: TestingNavigationVertical, title: 'Testing Navigation Vertical' },
  { path: 'testing/testing-radio', component: TestingRadio, title: 'Testing Radio' },
  { path: 'testing/testing-select', component: TestingSelect, title: 'Testing Select' },
  { path: 'testing/testing-tables', component: TestingTables, title: 'Testing Tables' },
  { path: 'testing/tag', component: TestingTag, title: 'Testing Tag' },
  { path: 'testing/side-navigation', component: TestingSideNavigation, title: 'Testing Side Navigation' },
  { path: '**', redirectTo: '' },
];
