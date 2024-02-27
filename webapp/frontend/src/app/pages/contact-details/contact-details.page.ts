import { CONSTANTS } from ':common/constants';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.page.html',
  styleUrls: ['./contact-details.page.scss'],
})
export class ContactDetailsPage implements OnInit {
  constructor(private navCtrl: NavController) {}
  public goToMessageList() {
    this.navCtrl.navigateRoot(CONSTANTS.discussion_list_page);
  }
  ngOnInit() {}
}
