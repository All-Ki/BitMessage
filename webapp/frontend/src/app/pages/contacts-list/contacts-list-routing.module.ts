import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsListPage } from './contacts-list.page';
import { ContactListComponent } from 'src/app/components/contact-list/contact-list.component';

const routes: Routes = [
  {
    path: '',
    component: ContactsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsListPageRoutingModule {}
