import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoggedInGuardGuard } from './guards/logged-in-guard.guard';
const routes: Routes = [
  {
    path: 'chatsList',
    loadChildren: () => import('./discussion-list/discussion-list.module').then( m => m.DiscussionListPageModule),
    canActivate: [LoggedInGuardGuard]
  },
  {
    path: 'chat/:id',
    loadChildren: () => import('./discussion-list/chat/chat.module').then( m => m.ChatPageModule),
    canActivate: [LoggedInGuardGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'settings',
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
