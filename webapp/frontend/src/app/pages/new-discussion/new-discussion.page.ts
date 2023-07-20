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

  public  contacts: Contact[] = [];
  public filteredContacts: Contact[] = [];
  public newDiscussionTarget: string = '';

  constructor(private navCtrl: NavController, private contactsSvc: ContactsService) { }

  goToDiscussionList(){
    this.navCtrl.navigateForward(CONSTANTS.discussion_list_page);
  }
  createDiscussion(){
    if(this.newDiscussionTarget == ''){
      return;
    }

    this.navCtrl.navigateForward(CONSTANTS.chat_page + '/' + this.newDiscussionTarget);
  }
  onTextChange(event: any){
    if(event == ''){
      this.filteredContacts = this.contacts;
      return;
    }
    this.filteredContacts = this.contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(event.toLowerCase()) || contact.public_key.toLowerCase().includes(event.toLowerCase());
    });
  }
  async ngOnInit() {
    this.contacts = await this.contactsSvc.getContacts();
    this.filteredContacts = this.contacts;
  }
  onContactSelected(contact: any){
    this.newDiscussionTarget = contact.public_key;
    this.createDiscussion();
  }
}
