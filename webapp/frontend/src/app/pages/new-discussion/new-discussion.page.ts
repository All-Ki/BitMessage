import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CONSTANTS } from 'src/app/constants';

@Component({
  selector: 'app-new-discussion',
  templateUrl: './new-discussion.page.html',
  styleUrls: ['./new-discussion.page.scss'],
})
export class NewDiscussionPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  public newDiscussionTarget: string = '';
  goToDiscussionList(){
    this.navCtrl.navigateForward(CONSTANTS.discussion_list_page);
  }
  createDiscussion(){
    if(this.newDiscussionTarget == ''){
      return;
    }

    this.navCtrl.navigateForward(CONSTANTS.chat_page + '/' + this.newDiscussionTarget);
  }

  ngOnInit() {
  }

}
