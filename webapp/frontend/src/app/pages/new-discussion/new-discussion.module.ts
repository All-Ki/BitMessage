import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewDiscussionPageRoutingModule } from './new-discussion-routing.module';

import { NewDiscussionPage } from './new-discussion.page';
import { ContactListComponent } from 'src/app/components/contact-list/contact-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewDiscussionPageRoutingModule,
    ContactListComponent
  ],
  declarations: [NewDiscussionPage]
})
export class NewDiscussionPageModule {}
