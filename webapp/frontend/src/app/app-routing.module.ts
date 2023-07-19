import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoggedInGuardGuard } from './guards/logged-in-guard.guard';
import { CONSTANTS } from './constants';
const routes: Routes = [
  {
    path: CONSTANTS.discussion_list_page,
    loadChildren: () => import('./discussion-list/discussion-list.module').then( m => m.DiscussionListPageModule),
    canActivate: [LoggedInGuardGuard]
  },
  {
    path: CONSTANTS.chat_page,
    loadChildren: () => import('./discussion-list/chat/chat.module').then( m => m.ChatPageModule),
    canActivate: [LoggedInGuardGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: CONSTANTS.login_page,
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: CONSTANTS.settings_page,
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule),
   canActivate: [LoggedInGuardGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
