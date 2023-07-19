import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MessagesService } from 'src/app/api/messages/messages.service';

@Component({
  selector: 'app-discussion-list',
  templateUrl: './discussion-list.page.html',
  styleUrls: ['./discussion-list.page.scss'],
})
export class DiscussionListPage implements OnInit {
  public discussions : any = [];


  constructor(public navCtrl: NavController, private msgSvc: MessagesService) {
    this.discussions = [
      {
        id: 1,
        name : 'Johnny',
        lastMessage : 'Hello',
        date : '2019-01-01',
      },
      {
        id: 2,
        name : 'Jane',
        lastMessage : 'Hi',
        date : '2019-01-01',
      }]
  }

  async ngOnInit() {
    this.discussions = await this.msgSvc.getDiscussions();
  }

}
