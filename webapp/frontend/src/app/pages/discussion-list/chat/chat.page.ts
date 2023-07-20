import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MessagesService, Message } from 'src/app/api/messages/messages.service';
import { ActivatedRoute } from '@angular/router';
import { CONSTANTS } from 'src/app/constants';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  public messages : any = [];
  discussion_id = "";
  goToDiscussionList(){
    console.log('goToDiscussionList');
    this.navCtrl.navigateForward(CONSTANTS.discussion_list_page);
  }

  constructor(public navCtrl: NavController, private msgSvc: MessagesService,private route: ActivatedRoute) {
  this.messages = [
    {
      id: 1,
      text : 'Hello',
      date : '2019-01-01',
    },
    {
      id: 2,
      text : 'Hi',
      date : '2019-01-01',
    },
    {
      id: 3,
      text : 'How are you?',
      date : '2019-01-01',
    },
    {
      id: 4,
      text : 'I am fine',
      date : '2019-01-01',
    },
    {
      id: 5,
      text : 'What about you?',
      date : '2019-01-01',
    },
    {
      id: 6,
      text : 'I am fine too',
      date : '2019-01-01',
    }
  ];

  }

  currentMessage = '';
  currentId = 7;
  sendMessage(){
    console.log('sendMessage');
    const msg = {
      id: this.currentId,
      text: this.currentMessage,
      date: new Date(),
    };
    this.messages.push(msg);
    this.currentMessage = '';
    this.currentId++;
    this.msgSvc.postMessage(msg.text, this.discussion_id);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.discussion_id = params['id'];
    })
  }

}
