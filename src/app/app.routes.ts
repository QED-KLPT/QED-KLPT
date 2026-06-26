import { Routes } from '@angular/router';
import { siteAccessGuard } from './guards/site-access.guard';
import { PasskeyGate } from './components/passkey-gate/passkey-gate';
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
import { Testing } from './components/testing/testing';
import { Sitemap } from './components/sitemap/sitemap';


export const routes: Routes = [
  { path: 'passkey', component: PasskeyGate, title: 'Site access' },
  {
    path: '',
    canActivate: [siteAccessGuard],
    children: [
  { path: '', component: Home, title: 'Home' },
  { path: 'klpt-foundations', component: Foundations, title: 'KLPT foundations', data: { lastUpdated: '19 June 2026' } },
  { path: 'klpt-foundations/conducting-and-documenting-quality-observations', component: QualityObservations, title: 'Conducting and documenting quality observations', data: { lastUpdated: '19 June 2026' } },
  { path: 'klpt-foundations/analysing-and-interpreting-observational-data', component: AnalysingData, title: 'Analysing and interpreting observational data', data: { lastUpdated: '19 June 2026' } },
  { path: 'learning-domains', component: LearningDomains, title: 'Learning domains', data: { lastUpdated: '19 June 2026' } },
  { path: 'learning-domains/language-and-literacy', component: LanguageAndLiteracy, title: 'Language and literacy', data: { lastUpdated: '19 June 2026' } },
  { path: 'learning-domains/executive-function', component: ExecutiveFunction, title: 'Executive function', data: { lastUpdated: '19 June 2026' } },
  {
    path: 'learning-domains/social-and-emotional-learning',
    component: SocialAndEmotionalLearning,
    title: 'Social and emotional learning',
    data: { lastUpdated: '19 June 2026' },
  },
  { path: 'learning-domains/physicality', component: Physicality, title: 'Physicality', data: { lastUpdated: '19 June 2026' } },
  {
    path: 'learning-domains/mathematics-and-numeracy',
    component: MathematicsAndNumeracy,
    title: 'Mathematics and numeracy',
    data: { lastUpdated: '19 June 2026' },
  },
  { path: 'practice-supports', component: PracticeSupports, title: 'Practice supports', data: { lastUpdated: '19 June 2026' } },
  {
    path: 'learning-observation-tool',
    loadChildren: () => import('./components/klpt-learning-observation-tool/klpt-learning-observation-tool-routing.module').then((m) => m.KlptRoutingModule),
    data: { lastUpdated: '19 June 2026' },
  },
  { path: 'about', component: About, title: 'About', data: { lastUpdated: '19 June 2026' } },
  { path: 'contact', component: Contact, title: 'Contact', data: { lastUpdated: '19 June 2026' } },
  { path: 'sitemap', component: Sitemap, title: 'Site map', data: { lastUpdated: '19 June 2026' } },  
  { path: 'testing', component: Testing, title: 'Testing Hub' },  
      { path: '**', redirectTo: '' },
    ],
  },
];
