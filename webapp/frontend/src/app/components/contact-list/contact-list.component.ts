import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Contact } from 'src/app/api/contacts/contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  imports:[IonicModule,CommonModule],
  standalone: true
})
export class ContactListComponent   {
  @Input() contacts: Contact[] = [];
  @Output() contactSelected = new EventEmitter<Contact>();
  constructor() { }


  onContactSelected(contact: Contact){
    this.contactSelected.emit(contact);
  }
  OnChanges(){
    //console.log(this.contacts);
  }

}
