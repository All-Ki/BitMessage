import { IonicModule } from '@ionic/angular';
import { DiscussionListComponentComponent } from './discussion-list-component.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DiscussionListComponentComponent],
  imports: [IonicModule, CommonModule],
  exports: [DiscussionListComponentComponent]
})
export class DiscussionListComponentModule { }