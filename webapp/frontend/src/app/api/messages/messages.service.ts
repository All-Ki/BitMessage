import { Injectable } from '@angular/core';
import { UsersService } from '../users/users.service';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { ServiceWithInit } from 'src/app/services/service-with-init';
import { StorageService } from 'src/app/services/storage.service';

export class Message {
  text: string = '' ;
  sender: string = "" ;
  receiver: string = "";
  date: Date = new Date();
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService extends ServiceWithInit{

  constructor(private userSvc: UsersService, private storage: StorageService) {
    super(storage);
  }

  Messages: Message[] = [];
  Discussions: Map<string, Message[]> = new Map<string, Message[]>();
  async postMessage(text: string, receiver: string) {
    const sender = this.userSvc.getCurrentUser();
    const msg = {
      text: text,
      sender: sender,
      receiver: receiver,
      date: new Date(),
    }
    await axios.post(environment.url + '/messages', msg);
    this.Discussions.get(receiver.toString())?.push(msg);

  }

  async getMessagesFrom(from : string) : Promise<any>{
    const receiver = this.userSvc.getCurrentUser();
    const res = await axios.get(environment.url + '/messages/' + receiver + '/' + from);
    return res.data;
  }
  async getDiscussions() : Promise<any>{
    const user = this.userSvc.getCurrentUser();
    console.log('getDiscussions');
    console.log(user);
    const res = await axios.get(environment.url + '/discussions/' + user);
    return res.data;
  }
}
