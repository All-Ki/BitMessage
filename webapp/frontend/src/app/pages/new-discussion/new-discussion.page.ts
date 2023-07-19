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
  goToDiscussionList(){
    this.navCtrl.navigateForward(CONSTANTS.discussion_list_page);
  }
  ngOnInit() {
  }

}
