import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscussionListPageRoutingModule } from './discussion-list-routing.module';

import { DiscussionListPage } from './discussion-list.page';
import { DiscussionListComponentModule } from './discussion-list-component/discussion-list-component.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscussionListPageRoutingModule,
    DiscussionListComponentModule
  ],
  declarations: [DiscussionListPage]
})
export class DiscussionListPageModule {}
