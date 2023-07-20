import { Injectable } from '@angular/core';
import { UsersService } from '../users/users.service';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { ServiceWithInit } from 'src/app/services/service-with-init';
import { StorageService } from 'src/app/services/storage.service';

export class Message {
  id?: number;
  text: string = '' ;
  sender: string = "" ;
  receiver: string = "";
  date: Date = new Date();
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService extends ServiceWithInit{
  Discussions: Map<string, Message[]> = new Map<string, Message[]>();
  current_user = '';

  constructor(private userSvc: UsersService, private storage: StorageService) {
    super(storage);
  }
  override async OnStorageReady() {
    this.current_user = this.userSvc.getCurrentUser();
    this.Discussions = await this.storage.get('discussions') || new Map<string, Message[]>();

  }
  async saveMessages(){
    await this.storage.set('discussions', this.Discussions);
  }
  async postMessage(text: string, receiver: string) {
    const sender = this.userSvc.getCurrentUser();
    const msg = {
      text: text,
      sender: sender,
      receiver: receiver,
      date: new Date(),
    }
    await axios.post(environment.url + '/messages', msg);
    let messages = this.Discussions.get(receiver);
    if (messages == null) {
      messages = [];
    }
    messages.push(msg);
    this.Discussions.set(receiver, messages);
    await this.saveMessages();
  }

  async getMessagesFrom(from : string) : Promise<any>{
    const receiver = this.userSvc.getCurrentUser();
    const res = await axios.get(environment.url + '/messages/' + receiver + '/' + from);
    let msgs = res.data;
    let messages = this.Discussions.get(from) || [];

    msgs.forEach((msg: any )=> {
      if(messages.find(m => m.id == msg.id) == null){
        messages.push(msg);
      }
    });
    messages.sort((a: Message, b: Message) => {
      return a.date.getTime() - b.date.getTime();
    });
    this.Discussions.set(from, messages);
    await this.saveMessages();

    return messages;
  }
  async getDiscussions() : Promise<any>{
    const res = await axios.get(environment.url + '/discussions/' + this.current_user);
    return res.data;
  }
}
