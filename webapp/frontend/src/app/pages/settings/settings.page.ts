import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CONSTANTS } from '../../constants';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public navCtrl: NavController,) { }

  goToDiscussionList(){
    this.navCtrl.navigateForward(CONSTANTS.discussion_list_page);
  }
  ngOnInit() {}
}
