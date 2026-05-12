import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Introduction } from './components/introduction/introduction';
import { LearningProgressionStatement } from './components/learning-progression-statement/learning-progression-statement';
import { ListSessions } from './components/list-sessions/list-sessions';
import { ReviewSession } from './components/review-session/review-session';
import { SelectBehaviours } from './components/select-behaviours/select-behaviours';
import { SelectDomains } from './components/select-domains/select-domains';
import { Klpt } from './klpt';
import { reviewSessionGuard } from './guards/review-session.guard';

const routes: Routes = [
  {
    path: '',
    component: Klpt,
    children: [
      { path: '', component: Introduction, title: 'KLPT introduction' },
      { path: 'introduction', component: Introduction, title: 'KLPT introduction' },
      { path: 'list-sessions', component: ListSessions, title: 'KLPT sessions' },
      { path: 'create-session', redirectTo: 'list-sessions', pathMatch: 'full' },
      { path: 'select-domains/:sessionId', component: SelectDomains, title: 'Select KLPT domains' },
      { path: 'select-behaviours/:sessionId', component: SelectBehaviours, title: 'Select KLPT behaviours' },
      {
        path: 'learning-progression-statement/:sessionId',
        component: LearningProgressionStatement,
        title: 'Learning progression statement',
      },
      { path: 'review-session/:sessionId', component: ReviewSession, title: 'Review KLPT session', canActivate: [reviewSessionGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KlptRoutingModule {}
