import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Contact, ContactsService } from 'src/app/api/contacts/contacts.service';
import { CONSTANTS } from 'src/app/constants';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.page.html',
  styleUrls: ['./contacts-list.page.scss'],
})
export class ContactsListPage implements OnInit {

  public contacts: Contact[] = [];

  constructor(private navCtrl: NavController, private contactsService: ContactsService) { }
  goToDiscussionList() {
    this.navCtrl.navigateForward(CONSTANTS.discussion_list_page);
  }
  async ngOnInit() {
    this.contacts = await this.contactsService.getContacts();
  }

  goToContactDetails(contact: Contact) {
    this.navCtrl.navigateForward(CONSTANTS.contact_details_page + '/' + contact.public_key)
  }
  addNewContact(){
    this.navCtrl.navigateForward(CONSTANTS.new_contact_page);
  }
}
