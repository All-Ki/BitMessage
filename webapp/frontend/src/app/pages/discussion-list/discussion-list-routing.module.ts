import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscussionListPage } from './discussion-list.page';

export const routes: Routes = [
  {
    path: '',
    component: DiscussionListPage
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscussionListPageRoutingModule {}
