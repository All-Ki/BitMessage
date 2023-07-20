import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MessagesService, Message } from 'src/app/api/messages/messages.service';
import { ActivatedRoute } from '@angular/router';
import {CONSTANTS} from ":common/constants";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  public messages : any = [];
  discussion_id = ""
  currentMessage = '';
  @ViewChild('msgList') private content: any;

  goToDiscussionList(){
    console.log('goToDiscussionList');
    this.navCtrl.navigateForward(CONSTANTS.discussion_list_page);
  }

  constructor(public navCtrl: NavController, private msgSvc: MessagesService,private route: ActivatedRoute) {

  }


  async sendMessage(){
    console.log('sendMessage');
    await this.msgSvc.postMessage(this.currentMessage, this.discussion_id);
    this.currentMessage = '';
    this.content.scrollToBottom(0);
  }

 async ngOnInit() {
    this.route.params.subscribe(async params => {
      console.log(params);
      this.discussion_id = params['id'];
      this.messages =   await this.msgSvc.getMessagesFrom(this.discussion_id);
     await this.content.scrollToBottom(0);

    })

  }

}
