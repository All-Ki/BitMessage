import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

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
    this.navCtrl.navigateForward('/chat/'+discussion.id);
  }
  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
  }

}
