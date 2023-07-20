import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoggedInGuardGuard } from './guards/logged-in-guard.guard';
import { CONSTANTS } from './constants';
const routes: Routes = [
  {
    path: CONSTANTS.discussion_list_page,
    loadChildren: () => import('./pages/discussion-list/discussion-list.module').then( m => m.DiscussionListPageModule),
    canActivate: [LoggedInGuardGuard]
  },
  {
    path: CONSTANTS.chat_page + '/:id',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule),
    canActivate: [LoggedInGuardGuard]
  },
  {
    path: '',
    redirectTo: CONSTANTS.login_page,
    pathMatch: 'full'
  },
  {
    path: CONSTANTS.login_page,
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: CONSTANTS.settings_page,
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule),
   canActivate: [LoggedInGuardGuard]
  },
  {
    path: CONSTANTS.new_discussion_page,
    loadChildren: () => import('./pages/new-discussion/new-discussion.module').then( m => m.NewDiscussionPageModule),
    canActivate: [LoggedInGuardGuard]

  },
  {
    path: CONSTANTS.contacts_list_page,
    loadChildren: () => import('./pages/contacts-list/contacts-list.module').then( m => m.ContactsListPageModule),
    canActivate: [LoggedInGuardGuard]

  },
  {
    path: CONSTANTS.contact_details_page + '/:id',
    loadChildren: () => import('./pages/contact-details/contact-details.module').then( m => m.ContactDetailsPageModule),
    canActivate: [LoggedInGuardGuard]
  },
  {
    path: CONSTANTS.new_contact_page,
    loadChildren: () => import('./pages/add-contact/add-contact.module').then( m => m.AddContactPageModule),
    canActivate: [LoggedInGuardGuard]
  },
];
//comment
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
