import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ContactsService } from 'src/app/api/contacts/contacts.service';
import { CONSTANTS } from ':common/constants';
import { Contact } from ':common/models';
@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.page.html',
  styleUrls: ['./contacts-list.page.scss'],
})
export class ContactsListPage {
  public contacts: Contact[] = [];
  public filteredContacts: Contact[] = [];
  public search: string = '';
  constructor(
    private navCtrl: NavController,
    private contactsService: ContactsService
  ) {}
  goToDiscussionList() {
    this.navCtrl.navigateForward(CONSTANTS.discussion_list_page);
  }
  async ionViewWillEnter() {
    console.log('ngOnInit');
    this.contacts = await this.contactsService.getContacts();
    this.filteredContacts = this.contacts;
    console.log(this.contacts);
  }
  goToContactDetails(contact: any) {
    this.navCtrl.navigateForward(
      CONSTANTS.contact_details_page + '/' + contact.public_key
    );
  }
  addNewContact() {
    this.navCtrl.navigateForward(CONSTANTS.new_contact_page);
  }
  onTextChange(event: any) {
    if (event == '') {
      this.filteredContacts = this.contacts;
      return;
    }
    this.filteredContacts = this.contacts.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(event.toLowerCase()) ||
        contact.public_key.toLowerCase().includes(event.toLowerCase())
      );
    });
  }
}
