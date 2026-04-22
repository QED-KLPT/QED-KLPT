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
import { Testing } from './components/testing/testing';
import { TestingCards } from './components/testing-cards/testing-cards';
import { UsingTheKlpt } from './components/using-the-klpt/using-the-klpt';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  {
    path: 'foundations',
    pathMatch: 'full',
    redirectTo: 'foundations/analysing-and-interpreting-observational-data',
  },
  {
    path: 'foundations/conducting-and-documenting-quality-observations',
    component: QualityObservations,
    title: 'Conducting and documenting quality observations',
  },
  {
    path: 'foundations/analysing-and-interpreting-observational-data',
    component: AnalysingData,
    title: 'Analysing and interpreting observational data',
  },
  {
    path: 'learning-domain-tool',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/using-the-klpt',
  },
  {
    path: 'learning-domain-tool/using-the-klpt',
    component: UsingTheKlpt,
    title: 'Using the KLPT',
  },
  {
    path: 'learning-domain-tool/learning-domains',
    component: LearningDomains,
    title: 'Learning domains',
  },
  {
    path: 'learning-domain-tool/learning-domains/language-and-literacy',
    component: LanguageAndLiteracy,
    title: 'Language and literacy',
  },
  {
    path: 'learning-domain-tool/learning-domains/executive-function',
    component: ExecutiveFunction,
    title: 'Executive function',
  },
  {
    path: 'learning-domain-tool/learning-domains/social-and-emotional-learning',
    component: SocialAndEmotionalLearning,
    title: 'Social and emotional learning',
  },
  {
    path: 'learning-domain-tool/learning-domains/physicality',
    component: Physicality,
    title: 'Physicality',
  },
  {
    path: 'learning-domain-tool/learning-domains/physicality/stable-movement',
    component: StableMovement,
    title: 'Stable Movement',
  },
  {
    path: 'learning-domain-tool/learning-domains/physicality/environment-awareness',
    component: EnvironmentAwareness,
    title: 'Environment Awareness',
  },
  {
    path: 'learning-domain-tool/learning-domains/physicality/object-control',
    component: ObjectControl,
    title: 'Object Control',
  },
  {
    path: 'learning-domain-tool/learning-domains/physicality/gross-motor',
    component: GrossMotor,
    title: 'Gross Motor',
  },
  {
    path: 'learning-domain-tool/learning-domains/physicality/fine-motor',
    component: FineMotor,
    title: 'Fine Motor',
  },
  {
    path: 'learning-domain-tool/learning-domains/physicality/sensory-learning',
    component: SensoryLearning,
    title: 'Sensory Learning',
  },
  {
    path: 'learning-domain-tool/learning-domains/mathematics-and-numeracy',
    component: MathematicsAndNumeracy,
    title: 'Mathematics and numeracy',
  },
  {
    path: 'learning-domain-tool/learning-domains/mathematics-and-numeracy/numbers',
    component: Numbers,
    title: 'Numbers',
  },
  {
    path: 'learning-domain-tool/learning-domains/mathematics-and-numeracy/quantity',
    component: Quantity,
    title: 'Quantity',
  },
  {
    path: 'learning-domain-tool/learning-domains/mathematics-and-numeracy/concepts-of-time',
    component: ConceptsOfTime,
    title: 'Concepts of time',
  },
  {
    path: 'learning-domain-tool/learning-domains/mathematics-and-numeracy/length',
    component: Length,
    title: 'Length',
  },
  {
    path: 'learning-domain-tool/learning-domains/mathematics-and-numeracy/distance',
    component: Distance,
    title: 'Distance',
  },
  {
    path: 'learning-domain-tool/learning-domains/mathematics-and-numeracy/capacity',
    component: Capacity,
    title: 'Capacity',
  },
  {
    path: 'learning-domain-tool/learning-domains/mathematics-and-numeracy/area',
    component: Area,
    title: 'Area',
  },
  {
    path: 'learning-domain-tool/observation-support-tool',
    component: KlptTool,
    title: 'Observation Support Tool',
  },
  {
    path: 'learning-domain-tool/practice-support',
    component: PracticeSupports,
    title: 'Practice Support',
  },
  {
    path: 'foundations/quality-observations',
    pathMatch: 'full',
    redirectTo: 'foundations/conducting-and-documenting-quality-observations',
  },
  {
    path: 'foundations/analysing-data',
    pathMatch: 'full',
    redirectTo: 'foundations/analysing-and-interpreting-observational-data',
  },
  {
    path: 'learning-domains',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/learning-domains',
  },
  {
    path: 'learning-domains/language-and-literacy',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/learning-domains/language-and-literacy',
  },
  {
    path: 'learning-domains/executive-function',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/learning-domains/executive-function',
  },
  {
    path: 'learning-domains/social-and-emotional-learning',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/learning-domains/social-and-emotional-learning',
  },
  {
    path: 'learning-domains/physicality',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/learning-domains/physicality',
  },
  {
    path: 'learning-domains/physicality/stable-movement',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/learning-domains/physicality/stable-movement',
  },
  {
    path: 'learning-domains/physicality/environment-awareness',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/learning-domains/physicality/environment-awareness',
  },
  {
    path: 'learning-domains/physicality/object-control',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/learning-domains/physicality/object-control',
  },
  {
    path: 'learning-domains/physicality/gross-motor',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/learning-domains/physicality/gross-motor',
  },
  {
    path: 'learning-domains/physicality/fine-motor',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/learning-domains/physicality/fine-motor',
  },
  {
    path: 'learning-domains/physicality/sensory-learning',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/learning-domains/physicality/sensory-learning',
  },
  {
    path: 'learning-domains/mathematics-and-numeracy',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/learning-domains/mathematics-and-numeracy',
  },
  {
    path: 'learning-domains/mathematics-and-numeracy/numbers',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/learning-domains/mathematics-and-numeracy/numbers',
  },
  {
    path: 'learning-domains/mathematics-and-numeracy/quantity',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/learning-domains/mathematics-and-numeracy/quantity',
  },
  {
    path: 'learning-domains/mathematics-and-numeracy/concepts-of-time',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/learning-domains/mathematics-and-numeracy/concepts-of-time',
  },
  {
    path: 'learning-domains/mathematics-and-numeracy/length',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/learning-domains/mathematics-and-numeracy/length',
  },
  {
    path: 'learning-domains/mathematics-and-numeracy/distance',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/learning-domains/mathematics-and-numeracy/distance',
  },
  {
    path: 'learning-domains/mathematics-and-numeracy/capacity',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/learning-domains/mathematics-and-numeracy/capacity',
  },
  {
    path: 'learning-domains/mathematics-and-numeracy/area',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/learning-domains/mathematics-and-numeracy/area',
  },
  {
    path: 'klpt-tool',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/observation-support-tool',
  },
  {
    path: 'practice-supports',
    pathMatch: 'full',
    redirectTo: 'learning-domain-tool/practice-support',
  },
  { path: 'about', component: About, title: 'About' },
  { path: 'contact', component: Contact, title: 'Contact' },
  { path: 'testing-alerts', component: TestingAlerts, title: 'Testing Alerts' },
  { path: 'testing-accordians', component: TestingAccordians, title: 'Testing Accordions' },
  { path: 'testing-text-area', component: TestingTextarea, title: 'Testing Text Area' },
  { path: 'testing', component: Testing, title: 'Testing Hub' },
  { path: 'testing/testing-cards', component: TestingCards, title: 'Testing Cards' },
  { path: '**', redirectTo: '' },
];
