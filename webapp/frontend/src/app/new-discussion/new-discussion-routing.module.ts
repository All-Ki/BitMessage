import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewDiscussionPage } from './new-discussion.page';

const routes: Routes = [
  {
    path: '',
    component: NewDiscussionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewDiscussionPageRoutingModule {}
