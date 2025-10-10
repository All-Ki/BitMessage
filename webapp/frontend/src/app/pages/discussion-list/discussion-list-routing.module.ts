import { inject, NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { DiscussionListPage } from './discussion-list.page';
import { DiscussionLight } from ':common/models';
import { UsersService } from 'src/app/api/users/users.service';
import { MessagesService } from 'src/app/api/messages/messages.service';

export const routes: Routes = [
  {
    path: '',
    component: DiscussionListPage,
  },
];

export const discussionsResolver: ResolveFn<DiscussionLight> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const msgStore = inject(MessagesService);
  return msgStore.getDiscussions();
};

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscussionListPageRoutingModule {}
