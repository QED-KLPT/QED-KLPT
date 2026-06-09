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
    title: 'Learning Observation Tool',
    component: Klpt,
    children: [
      { path: '', component: Introduction, title: 'Introduction' },
      { path: 'introduction', component: Introduction, title: 'Introduction' },
      { path: 'sessions', component: ListSessions, title: 'Sessions' },
      { path: 'create-session', redirectTo: 'sessions', pathMatch: 'full' },
      { path: 'select-domains/:sessionId', component: SelectDomains, title: 'Select domains' },
      { path: 'select-behaviours/:sessionId', component: SelectBehaviours, title: 'Select behaviours' },
      {
        path: 'learning-progression-statement/:sessionId',
        component: LearningProgressionStatement,
        title: 'Learning progression statement',
        canActivate: [reviewSessionGuard],
      },
      { path: 'review-session/:sessionId', component: ReviewSession, title: 'Review session', canActivate: [reviewSessionGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KlptRoutingModule {}
