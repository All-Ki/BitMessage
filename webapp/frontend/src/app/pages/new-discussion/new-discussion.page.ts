import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Contact, ContactsService } from 'src/app/api/contacts/contacts.service';
import { CONSTANTS } from 'src/app/constants';

@Component({
  selector: 'app-new-discussion',
  templateUrl: './new-discussion.page.html',
  styleUrls: ['./new-discussion.page.scss'],
})
export class NewDiscussionPage implements OnInit {

  private contacts: Contact[] = [];
  constructor(private navCtrl: NavController, private contactsSvc: ContactsService) { }

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
