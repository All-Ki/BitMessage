import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ContactsListPage } from '../contacts-list/contacts-list.page';
import { CONSTANTS } from 'src/app/constants';
import { Contact } from 'src/app/api/contacts/contacts.service';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {

  public contact: any = {
    name: "",
    publicKey: "",
    networks: [],
  };

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  goToContactList() {
    this.navCtrl.navigateForward(CONSTANTS.contacts_list_page);
  }
  addContact() {
    if (this.contact.name.trim() === "" || this.contact.publicKey.trim() === ""){
      console.log("Please")
    }
  }
}
