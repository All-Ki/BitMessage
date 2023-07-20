import { Injectable } from '@angular/core';
import { UsersService } from '../users/users.service';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { ServiceWithInit } from 'src/app/services/service-with-init';
import { StorageService } from 'src/app/services/storage.service';
import * as uuid from 'uuid';
export class Message {
  id?: number;
  client_id: string = '';
  text: string = '' ;
  sender: string = "" ;
  receiver: string = "";
  date: Date = new Date();
}
export class Discussion {
  me : string = '';
  other : string = '';
  lastMessage : string = '';
  lastMessageDate : Date = new Date();
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
    let discussions =  await this.storage.get('discussions');
    console.log('discussions');
    console.log(discussions);
    if(discussions != null){
      this.Discussions = discussions;
    }


  }
  async saveMessages(){
    console.log('saveMessages');
    console.log(this.Discussions);
    await this.storage.set('discussions', this.Discussions);
  }
  async postMessage(text: string, receiver: string) {
    console.log('postMessage');
    const sender = this.userSvc.getCurrentUser();
    const msg = {
      text: text,
      sender: sender,
      receiver: receiver,
      date: new Date(),
      client_id: uuid.v4(),
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

  async getMessagesFrom(from : string) : Promise<Message[]>{
    await this.WaitUntilReady();
    const receiver = this.userSvc.getCurrentUser();
    const res = await axios.get(environment.url + '/messages/' + receiver + '/' + from);
    let msgs = res.data;
    console.log("from server");
    console.log(msgs);
    msgs = msgs.filter((msg: any) => { return msg.sender == from});
    let messages = this.Discussions.get(from) || [];
    console.log('messages');
    console.log(messages);
    msgs.forEach((msg: any )=> {
      if(messages.find(m => m.client_id == msg.client_id) == null){
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

  messageListToDiscussion(messages : Message[]) : Discussion{
    if(messages.length == 0){
      return new Discussion();
    }
    let discussion: Discussion = new Discussion();
    discussion.me = this.userSvc.getCurrentUser();
    discussion.other = messages[0].sender == discussion.me ? messages[0].receiver : messages[0].sender;
    discussion.lastMessage = messages[messages.length - 1].text;
    discussion.lastMessageDate = messages[messages.length - 1].date;
    return discussion;

  }

  async getDiscussions() : Promise<any>{
    //const res = await axios.get(environment.url + '/discussions/' + this.current_user);
    await this.WaitUntilReady();
    let discussions : Discussion[] = [];
    for(let [key, value] of this.Discussions){
      console.log(key);
      console.log(value);
      if(value.length == 0){
        continue;
      }
      discussions.push(this.messageListToDiscussion(value));
    }
    return discussions;
  }
}
