import { Injectable } from '@angular/core';
import { UsersService } from '../users/users.service';
import { environment } from 'src/environments/environment';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private userSvc: UsersService) { }


  async postMessage(text: string, receiver: number) {
    const sender = this.userSvc.getCurrentUser();
    const msg = {
      text: text,
      sender: sender,
      receiver: receiver,
      date: new Date(),
    }
    await axios.post(environment.url + '/messages', msg);
  }

  async getMessages() : Promise<any>{
    const receiver = this.userSvc.getCurrentUser();
    const res = await axios.get(environment.url + '/messages/' + receiver);
    return res.data;
  }
}
