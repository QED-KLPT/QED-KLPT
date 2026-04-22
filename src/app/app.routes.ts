import { Routes } from '@angular/router';
import { About } from './components/about/about';
import { AnalysingData } from './components/analysing-data/analysing-data';
import { Area } from './components/mathematics-and-numeracy/area/area';
import { Capacity } from './components/mathematics-and-numeracy/capacity/capacity';
import { ConceptsOfTime } from './components/mathematics-and-numeracy/concepts-of-time/concepts-of-time';
import { Contact } from './components/contact/contact';
import { Distance } from './components/mathematics-and-numeracy/distance/distance';
import { EnvironmentAwareness } from './components/physicality/environment-awareness/environment-awareness';
import { ExecutiveFunction } from './components/executive-function/executive-function';
import { FineMotor } from './components/physicality/fine-motor/fine-motor';
import { Foundations } from './components/foundations/foundations';
import { GrossMotor } from './components/physicality/gross-motor/gross-motor';
import { Home } from './components/home/home';
import { KlptTool } from './components/klpt-tool/klpt-tool';
import { LanguageAndLiteracy } from './components/language-and-literacy/language-and-literacy';
import { LearningDomains } from './components/learning-domains/learning-domains';
import { Length } from './components/mathematics-and-numeracy/length/length';
import { MathematicsAndNumeracy } from './components/mathematics-and-numeracy/mathematics-and-numeracy';
import { Numbers } from './components/mathematics-and-numeracy/numbers/numbers';
import { ObjectControl } from './components/physicality/object-control/object-control';
import { Physicality } from './components/physicality/physicality';
import { PracticeSupports } from './components/practice-supports/practice-supports';
import { Quantity } from './components/mathematics-and-numeracy/quantity/quantity';
import { QualityObservations } from './components/quality-observations/quality-observations';
import { SensoryLearning } from './components/physicality/sensory-learning/sensory-learning';
import { SocialAndEmotionalLearning } from './components/social-and-emotional-learning/social-and-emotional-learning';
import { StableMovement } from './components/physicality/stable-movement/stable-movement';
import { TestingAlerts } from './components/testing-alerts/testing-alerts';
import { TestingAccordians } from './components/testing-accordians/testing-accordians';
import { TestingTextarea } from './components/testing/text-area/text-area';
import { TestingCheckbox } from './components/testing/checkbox/checkbox';
import { Testing } from './components/testing/testing';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'foundations', component: Foundations, title: 'Foundations' },
  { path: 'foundations/quality-observations', component: QualityObservations, title: 'Quality observations' },
  { path: 'foundations/analysing-data', component: AnalysingData, title: 'Analysing data' },
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
  { path: '**', redirectTo: '' },
];
