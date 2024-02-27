import { Injectable } from '@angular/core';
import { ServiceWithInit } from 'src/app/services/service-with-init';
import { StorageService } from 'src/app/services/storage.service';
import { Contact } from ':common/models';
@Injectable({
  providedIn: 'root',
})
export class ContactsService extends ServiceWithInit {
  Contacts: Map<string, Contact> = new Map<string, Contact>();
  async saveContacts() {
    await this.storage.set('contacts', this.Contacts);
  }

  constructor(private storage: StorageService) {
    super(storage);
    //  for(let i = 0; i < 10; i++){
    //  this.Contacts.set('0x' + i, {name: 'Contact ' + i, public_key: '0x' + i, profile_picture: ''});
    //}
  }

  override async OnStorageReady() {
    this.Contacts =
      (await this.storage.get<Map<string, Contact>>('contacts')) ||
      new Map<string, Contact>();
  }
  public async getContacts(): Promise<Contact[]> {
    await this.WaitUntilReady();
    return [...this.Contacts.values()];
  }

  public async addContact(contact: Contact): Promise<boolean> {
    if (this.Contacts.get(contact.public_key) != null) {
      return false;
    }
    this.Contacts.set(contact.public_key, contact);
    await this.saveContacts();

    return true;
  }

  public async removeContact(contact: Contact): Promise<boolean> {
    if (this.Contacts.get(contact.public_key) == null) {
      return false;
    }
    this.Contacts.delete(contact.public_key);
    await this.saveContacts();

    return true;
  }

  public async updateContact(contact: Contact): Promise<boolean> {
    if (this.Contacts.get(contact.public_key) == null) {
      return false;
    }
    this.Contacts.set(contact.public_key, contact);
    await this.saveContacts();

    return true;
  }
}
