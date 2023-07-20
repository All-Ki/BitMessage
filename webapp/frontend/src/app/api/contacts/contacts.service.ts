import { Injectable } from '@angular/core';
import { ServiceWithInit } from 'src/app/services/service-with-init';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})

export type Contact = {
  name: string;
  public_key: string;
  profile_picture: string;
}
export class ContactsService extends ServiceWithInit {


  Contacts: Map<string,Contact> = new Map<string,Contact>();
  constructor(private storage: StorageService) {
    super(storage);
    for(let i = 0; i < 10; i++){
      this.Contacts.set('0x' + i, {name: 'Contact ' + i, public_key: '0x' + i, profile_picture: ''});
    }
  }


  override async OnStorageReady() {}
  public async getContacts(): Promise<Contact[]> {
    await this.WaitUntilReady();
    return [...this.Contacts.values()];
  }

  public async addContact(name: string, public_key: string, profile_picture:string) : Promise<boolean> {
    if(this.Contacts.get(public_key) != null){
      return false;
    };
    this.Contacts.set(public_key, {name: name, public_key: public_key, profile_picture: profile_picture});
    return true;
  }
}
