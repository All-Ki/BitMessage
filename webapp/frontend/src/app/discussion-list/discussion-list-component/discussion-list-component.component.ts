import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-discussion-list-component',
  templateUrl: './discussion-list-component.component.html',
  styleUrls: ['./discussion-list-component.component.scss'],
})
export class DiscussionListComponentComponent implements OnInit {

  @Input() discussions : any = [];
  public goToChat(id : string){
    console.log('goToChat');
    this.navCtrl.navigateForward('/message/'+id);
  }

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
  }

}
