import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CONSTANTS } from 'src/app/constants';

@Component({
  selector: 'app-discussion-list-component',
  templateUrl: './discussion-list-component.component.html',
  styleUrls: ['./discussion-list-component.component.scss'],
})
export class DiscussionListComponentComponent implements OnInit {

  @Input() discussions : any = [];
  public goToChat(discussion : any){
    console.log('goToChatsss');
    console.log(discussion);
    this.navCtrl.navigateForward(CONSTANTS.chat_page+discussion.id);
  }
  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
  }

}
