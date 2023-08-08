import { Injectable } from '@angular/core';
import { UsersService } from '../users/users.service';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { ServiceWithInit } from 'src/app/services/service-with-init';
import { StorageService } from 'src/app/services/storage.service';
import * as uuid from 'uuid';
import {Message} from ':common/models';
import {Discussion} from ':common/models';
import { CONSTANTS } from ':common/constants';
import { ApiService } from '../api/api.service';

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
    await this.storage.set('discussions', this.Discussions);
  }
  async postMessage(text: string, receiver: string) {
    const nonce = await this.userSvc.getNonce(CONSTANTS.Actions.send_message);
    const headers = this.userSvc.buildHeaders(CONSTANTS.Actions.send_message, nonce)
    const sender = this.userSvc.getCurrentUser();
    const msg = {
      text: text,
      sender: sender,
      receiver: receiver,
      date: new Date(),
      client_id: uuid.v4(),
    }
    await ApiService.post(environment.url + '/messages', msg, {headers: headers});
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
    const nonce = await this.userSvc.getNonce(CONSTANTS.Actions.get_messages);
    const headers = this.userSvc.buildHeaders(CONSTANTS.Actions.get_messages, nonce)
    const res = await ApiService.get<any>(environment.url + '/messages/' + this.current_user + '/' + from, {headers: headers});
    let msgs = res.data;
    msgs = msgs.filter((msg: any) => { return msg.sender == from});
    let messages = this.Discussions.get(from) || [];
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
      if(value.length == 0){
        continue;
      }
      discussions.push(this.messageListToDiscussion(value));
    }
    return discussions;
  }
  encryptMessage(message: string, receiver: string){

  }

  decryptMessage(message: string){

  }
}
