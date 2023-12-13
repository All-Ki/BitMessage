import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscussionListPage } from './discussion-list.page';
import { ClipboardModule } from '@angular/cdk/clipboard';

export const routes: Routes = [
  {
    path: '',
    component: DiscussionListPage
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ClipboardModule],
})
export class DiscussionListPageRoutingModule { }
