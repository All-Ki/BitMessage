import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CONSTANTS } from 'src/app/constants';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.page.html',
  styleUrls: ['./contacts-list.page.scss'],
})
export class ContactsListPage implements OnInit {

  constructor(private navCtrl: NavController) { }
  goToDiscussionList(){
    this.navCtrl.navigateForward(CONSTANTS.discussion_list_page);
  }
  ngOnInit() {
  }

}
