import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactsListPageRoutingModule } from './contacts-list-routing.module';

import { ContactsListPage } from './contacts-list.page';
import { ContactListComponent } from 'src/app/components/contact-list/contact-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactsListPageRoutingModule,
    ContactListComponent
  ],
  declarations: [ContactsListPage]
})
export class ContactsListPageModule {}
