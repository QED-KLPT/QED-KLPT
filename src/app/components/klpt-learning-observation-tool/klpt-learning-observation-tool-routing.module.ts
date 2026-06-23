import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Introduction } from './components/introduction/introduction';
import { LearningProgressionStatement } from './components/learning-progression-statement/learning-progression-statement';
import { ListSessions } from './components/list-sessions/list-sessions';
import { ReviewSession } from './components/review-session/review-session';
import { SelectBehaviours } from './components/select-behaviours/select-behaviours';
import { SelectDomains } from './components/select-domains/select-domains';
import { Klpt } from './klpt-learning-observation-tool';
import { reviewSessionGuard } from './guards/review-session.guard';

const routes: Routes = [
  {
    path: '',
    title: 'Learning observation tool',
    component: Klpt,
    children: [
      { path: '', component: Introduction, title: 'Learning observation tool', data: { lastUpdated: '19 June 2026' } },
      { path: 'introduction', component: Introduction, title: 'Learning observation tool', data: { lastUpdated: '19 June 2026' } },
      { path: 'sessions', component: ListSessions, title: 'Learning observation tool', data: { lastUpdated: '19 June 2026' } },
      { path: 'create-session', redirectTo: 'sessions', pathMatch: 'full' },
      { path: 'select-domains/:sessionId', component: SelectDomains, title: 'Learning observation tool', data: { lastUpdated: '19 June 2026' } },
      { path: 'select-behaviours/:sessionId', component: SelectBehaviours, title: 'Learning observation tool', data: { lastUpdated: '19 June 2026' } },
      {
        path: 'learning-progression-statement/:sessionId',
        component: LearningProgressionStatement,
        title: 'Learning observation tool',
        data: { lastUpdated: '19 June 2026' },
        canActivate: [reviewSessionGuard],
      },
      { path: 'review-session/:sessionId', component: ReviewSession, title: 'Learning observation tool', data: { lastUpdated: '19 June 2026' }, canActivate: [reviewSessionGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KlptRoutingModule {}
