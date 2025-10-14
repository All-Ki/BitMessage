import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';
import { MessagesService } from 'src/app/api/messages/messages.service';
import { ActivatedRoute } from '@angular/router';
import { CONSTANTS } from ':common/constants';
import { Message } from ':common/models';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  public messages: any = [];
  discussion_id = '';
  currentMessage = '';
  @ViewChild('msgList') private content?: IonContent;

  goToDiscussionList() {
    console.log('goToDiscussionList');
    this.navCtrl.navigateForward(CONSTANTS.discussion_list_page);
  }

  /** Dependencies injected via Angular 17's inject() API */
  private readonly navCtrl = inject(NavController);
  private readonly msgSvc = inject(MessagesService);
  private readonly route = inject(ActivatedRoute);

  async sendMessage() {
    await this.msgSvc.postMessage(this.currentMessage, this.discussion_id);
    this.currentMessage = '';
    await this.scrollToBottom();
  }

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.discussion_id = params['id'];
      this.messages = await this.msgSvc.getMessagesFrom(this.discussion_id);
      await this.scrollToBottom();
    });
  }

  private async scrollToBottom(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 50)); // Wait for DOM update
    await this.content?.scrollToBottom(300);
  }
}
