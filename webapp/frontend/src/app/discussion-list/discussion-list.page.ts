import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-discussion-list',
  templateUrl: './discussion-list.page.html',
  styleUrls: ['./discussion-list.page.scss'],
})
export class DiscussionListPage implements OnInit {
  public discussions : any = [];
  public goToChat(discussion : any){
    console.log('goToChat');
    this.navCtrl.navigateForward('/tabs/chat');
  }

  constructor(public navCtrl: NavController) {
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

  ngOnInit() {
  }

}
