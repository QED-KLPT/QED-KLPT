import { Routes } from '@angular/router';
import { About } from './components/about/about';
import { AnalysingData } from './components/analysing-data/analysing-data';
import { Contact } from './components/contact/contact';
import { ExecutiveFunction } from './components/executive-function/executive-function';
import { Foundations } from './components/foundations/foundations';
import { Home } from './components/home/home';
import { KlptTool } from './components/klpt-tool/klpt-tool';
import { LanguageAndLiteracy } from './components/language-and-literacy/language-and-literacy';
import { LearningDomains } from './components/learning-domains/learning-domains';
import { MathematicsAndNumeracy } from './components/mathematics-and-numeracy/mathematics-and-numeracy';
import { Physicality } from './components/physicality/physicality';
import { QualityObservations } from './components/quality-observations/quality-observations';
import { SocialAndEmotionalLearning } from './components/social-and-emotional-learning/social-and-emotional-learning';

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
    path: 'learning-domains/mathematics-and-numeracy',
    component: MathematicsAndNumeracy,
    title: 'Mathematics and numeracy',
  },
  { path: 'klpt-tool', component: KlptTool, title: 'KLPT tool' },
  { path: 'about', component: About, title: 'About' },
  { path: 'contact', component: Contact, title: 'Contact' },
  { path: '**', redirectTo: '' },
];
