import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscussionListPageRoutingModule } from './discussion-list-routing.module';

import { DiscussionListPage } from './discussion-list.page';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscussionListPageRoutingModule,
    MatSnackBarModule, MatInputModule, MatButtonModule, MatSelectModule

  ],
  declarations: [DiscussionListPage]
})
export class DiscussionListPageModule { }
