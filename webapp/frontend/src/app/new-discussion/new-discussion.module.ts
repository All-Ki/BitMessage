import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewDiscussionPageRoutingModule } from './new-discussion-routing.module';

import { NewDiscussionPage } from './new-discussion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewDiscussionPageRoutingModule
  ],
  declarations: [NewDiscussionPage]
})
export class NewDiscussionPageModule {}
