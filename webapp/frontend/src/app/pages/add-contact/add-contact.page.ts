import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CONSTANTS } from ':common/constants';
import { ContactsService } from 'src/app/api/contacts/contacts.service';
import { Contact } from ':common/models';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {
  public contact: any = {
    name: '',
    publicKey: '',
    networks: [],
  };

  predefinedNetworks: string[] = ['BitMessage', 'Ethereum', 'Bitcoin'];
  selectedNetworks: string[] = [];

  constructor(
    private navCtrl: NavController,
    private contactsService: ContactsService
  ) {}

  ngOnInit() {}
  goToContactList() {
    this.navCtrl.navigateForward(CONSTANTS.contacts_list_page);
  }
  isNetworkSelected(network: string): boolean {
    return this.selectedNetworks.includes(network);
  }
  addContact() {
    const contact: Contact = {
      name: this.contact.name,
      public_key: this.contact.publicKey,
      networks: this.selectedNetworks,
    };

    if (
      this.contact.name.trim() === '' ||
      this.contact.publicKey.trim() === ''
    ) {
      console.log('Please complete all required fields');
    }
    // TODO: comparer la clef entrée avec les clefs existantes pour savoir si c'est une clef valide
    else {
      this.contactsService.addContact(contact);
      this.goToContactList();
    }
  }
}
