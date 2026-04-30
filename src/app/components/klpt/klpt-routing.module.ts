import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSession } from './create-session/create-session';
import { Introduction } from './introduction/introduction';
import { LearningProgressionStatement } from './learning-progression-statement/learning-progression-statement';
import { ListSessions } from './list-sessions/list-sessions';
import { ReviewSession } from './review-session/review-session';
import { SelectBehaviours } from './select-behaviours/select-behaviours';
import { SelectDomains } from './select-domains/select-domains';
import { Klpt } from './klpt';

const routes: Routes = [
  {
    path: '',
    component: Klpt,
    children: [
      { path: '', component: Introduction, title: 'KLPT introduction' },
      { path: 'introduction', component: Introduction, title: 'KLPT introduction' },
      { path: 'list-sessions', component: ListSessions, title: 'KLPT sessions' },
      { path: 'create-session', component: CreateSession, title: 'Create KLPT session' },
      { path: 'select-domains', component: SelectDomains, title: 'Select KLPT domains' },
      { path: 'select-behaviours', component: SelectBehaviours, title: 'Select KLPT behaviours' },
      {
        path: 'learning-progression-statement',
        component: LearningProgressionStatement,
        title: 'Learning progression statement',
      },
      { path: 'review-session', component: ReviewSession, title: 'Review KLPT session' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KlptRoutingModule {}
