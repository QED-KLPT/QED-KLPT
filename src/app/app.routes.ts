import { Routes } from '@angular/router';
import { About } from './components/about/about';
import { AnalysingData } from './components/analysing-data/analysing-data';
import { Area } from './components/mathematics-and-numeracy/area/area';
import { Capacity } from './components/mathematics-and-numeracy/capacity/capacity';
import { CognitiveFlexibility } from './components/executive-function/cognitive-flexibility/cognitive-flexibility';
import { ConceptsOfTime } from './components/mathematics-and-numeracy/concepts-of-time/concepts-of-time';
import { Contact } from './components/contact/contact';
import { Distance } from './components/mathematics-and-numeracy/distance/distance';
import { EnvironmentAwareness } from './components/physicality/environment-awareness/environment-awareness';
import { ExecutiveFunction } from './components/executive-function/executive-function';
import { FineMotor } from './components/physicality/fine-motor/fine-motor';
import { Foundations } from './components/foundations/foundations';
import { GrossMotor } from './components/physicality/gross-motor/gross-motor';
import { Home } from './components/home/home';
import { InhibitoryControl } from './components/executive-function/inhibitory-control/inhibitory-control';
import { KlptTool } from './components/klpt-tool/klpt-tool';
import { LanguageAndLiteracy } from './components/language-and-literacy/language-and-literacy';
import { LearningDomains } from './components/learning-domains/learning-domains';
import { Length } from './components/mathematics-and-numeracy/length/length';
import { MathematicsAndNumeracy } from './components/mathematics-and-numeracy/mathematics-and-numeracy';
import { Numbers } from './components/mathematics-and-numeracy/numbers/numbers';
import { ObjectControl } from './components/physicality/object-control/object-control';
import { Physicality } from './components/physicality/physicality';
import { PlanningOrganization } from './components/executive-function/planning-organization/planning-organization';
import { PracticeSupports } from './components/practice-supports/practice-supports';
import { Quantity } from './components/mathematics-and-numeracy/quantity/quantity';
import { QualityObservations } from './components/quality-observations/quality-observations';
import { SelfRegulation } from './components/executive-function/self-regulation/self-regulation';
import { SensoryLearning } from './components/physicality/sensory-learning/sensory-learning';
import { SocialAndEmotionalLearning } from './components/social-and-emotional-learning/social-and-emotional-learning';
import { StableMovement } from './components/physicality/stable-movement/stable-movement';
import { TestingAlerts } from './components/testing-alerts/testing-alerts';
import { TestingAccordians } from './components/testing-accordians/testing-accordians';
import { TestingTextarea } from './components/testing/text-area/text-area';
import { TestingCheckbox } from './components/testing/checkbox/checkbox';
import { Testing } from './components/testing/testing';
import { TestingCards } from './components/testing-cards/testing-cards';
import { TestingPromotionalPanel } from './components/testing-promotional-panel/testing-promotional-panel';
import { TestingBanner } from './components/testing-banner/testing-banner';
import { TestingButtons } from './components/testing-buttons/testing-buttons';
import { TestingBreadcrumbs } from './components/testing-breadcrumbs/testing-breadcrumbs';
import { TestingCallout } from './components/testing-callout/testing-callout';
import { TestingDirectionLinks } from './components/testing-direction-links/testing-direction-links';
import { TestingFileUpload } from './components/testing-file-upload/testing-file-upload';
import { TestingFooter } from './components/testing-footer/testing-footer';
import { TestingForms } from './components/testing-forms/testing-forms';
import { TestingGlobalAlert } from './components/testing-global-alert/testing-global-alert';
import { TestingInPageAlert } from './components/testing-in-page-alert/testing-in-page-alert';
import { TestingHeader } from './components/testing/testing-header/testing-header';
import { TestingLoadingSpinner } from './components/testing-loading-spinner/testing-loading-spinner';
import { TestingHorizontalRule } from './components/testing-horizontal-rule/testing-horizontal-rule';
import { TestingNavigationalHorizontal } from './components/testing-navigational-horizontal/testing-navigational-horizontal';
import { TestingInPageNav } from './components/testing-in-page-nav/testing-in-page-nav';
import { TestingNavigationVertical } from './components/testing-navigation-vertical/testing-navigation-vertical';
import { TestingNavigation } from './components/testing-navigation/testing-navigation';
import { TestingRadio } from './components/testing-radio/testing-radio';
import { TestingSelect } from './components/testing-select/testing-select';
import { WorkingMemory } from './components/executive-function/working-memory/working-memory';
import { AttentionFocus } from './components/executive-function/attention-focus/attention-focus';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'foundations', component: Foundations, title: 'Foundations' },
  { path: 'foundations/quality-observations', component: QualityObservations, title: 'Quality observations' },
  { path: 'foundations/analysing-data', component: AnalysingData, title: 'Analysing data' },
  { path: 'learning-domains', component: LearningDomains, title: 'Learning domains' },
  { path: 'learning-domains/language-and-literacy', component: LanguageAndLiteracy, title: 'Language and literacy' },
  { path: 'learning-domains/executive-function', component: ExecutiveFunction, title: 'Executive function' },
  { path: 'learning-domains/executive-function/inhibitory-control', component: InhibitoryControl, title: 'Lorem Ipsum' },
  { path: 'learning-domains/executive-function/working-memory', component: WorkingMemory, title: 'Dolor Sit Amet' },
  { path: 'learning-domains/executive-function/cognitive-flexibility', component: CognitiveFlexibility, title: 'Sed Do Eiusmod' },
  { path: 'learning-domains/executive-function/self-regulation', component: SelfRegulation, title: 'Tempor Incididunt' },
  { path: 'learning-domains/executive-function/planning-organization', component: PlanningOrganization, title: 'Consectetur Adipiscing' },
  { path: 'learning-domains/executive-function/attention-focus', component: AttentionFocus, title: 'Ut Labore Et Dolore' },
  {
    path: 'learning-domains/social-and-emotional-learning',
    component: SocialAndEmotionalLearning,
    title: 'Social and emotional learning',
  },
  { path: 'learning-domains/physicality', component: Physicality, title: 'Physicality' },
  {
    path: 'learning-domains/physicality/stable-movement',
    component: StableMovement,
    title: 'Stable Movement',
  },
  {
    path: 'learning-domains/physicality/environment-awareness',
    component: EnvironmentAwareness,
    title: 'Environment Awareness',
  },
  {
    path: 'learning-domains/physicality/object-control',
    component: ObjectControl,
    title: 'Object Control',
  },
  {
    path: 'learning-domains/physicality/gross-motor',
    component: GrossMotor,
    title: 'Gross Motor',
  },
  {
    path: 'learning-domains/physicality/fine-motor',
    component: FineMotor,
    title: 'Fine Motor',
  },
  {
    path: 'learning-domains/physicality/sensory-learning',
    component: SensoryLearning,
    title: 'Sensory Learning',
  },
  {
    path: 'learning-domains/mathematics-and-numeracy',
    component: MathematicsAndNumeracy,
    title: 'Mathematics and numeracy',
  },
  {
    path: 'learning-domains/mathematics-and-numeracy/numbers',
    component: Numbers,
    title: 'Numbers',
  },
  {
    path: 'learning-domains/mathematics-and-numeracy/quantity',
    component: Quantity,
    title: 'Quantity',
  },
  {
    path: 'learning-domains/mathematics-and-numeracy/concepts-of-time',
    component: ConceptsOfTime,
    title: 'Concepts of time',
  },
  {
    path: 'learning-domains/mathematics-and-numeracy/length',
    component: Length,
    title: 'Length',
  },
  {
    path: 'learning-domains/mathematics-and-numeracy/distance',
    component: Distance,
    title: 'Distance',
  },
  {
    path: 'learning-domains/mathematics-and-numeracy/capacity',
    component: Capacity,
    title: 'Capacity',
  },
  {
    path: 'learning-domains/mathematics-and-numeracy/area',
    component: Area,
    title: 'Area',
  },
  { path: 'klpt-tool', component: KlptTool, title: 'KLPT tool' },
  { path: 'practice-supports', component: PracticeSupports, title: 'Practice supports' },
  { path: 'about', component: About, title: 'About' },
  { path: 'contact', component: Contact, title: 'Contact' },
  { path: 'testing-alerts', component: TestingAlerts, title: 'Testing Alerts' },
  { path: 'testing-accordians', component: TestingAccordians, title: 'Testing Accordions' },
  { path: 'testing-text-area', component: TestingTextarea, title: 'Testing Text Area' },
  { path: 'testing-checkbox', component: TestingCheckbox, title: 'Testing Checkbox' },
  { path: 'testing', component: Testing, title: 'Testing Hub' },
  { path: 'testing/testing-cards', component: TestingCards, title: 'Testing Cards' },
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
  { path: '**', redirectTo: '' },
];
