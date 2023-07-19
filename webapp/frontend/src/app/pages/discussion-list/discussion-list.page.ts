import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MessagesService } from 'src/app/api/messages/messages.service';
import { UsersService } from 'src/app/api/users/users.service';
import { CONSTANTS } from 'src/app/constants';

@Component({
  selector: 'app-discussion-list',
  templateUrl: './discussion-list.page.html',
  styleUrls: ['./discussion-list.page.scss'],
})
export class DiscussionListPage implements OnInit {
  public discussions : any = [];

  public goToChat(discussion : any){
    console.log('goToChatsss');
    console.log(discussion);
    this.navCtrl.navigateForward(CONSTANTS.chat_page+"/"+discussion.id);
  }
  public goTo(url : string){
    this.navCtrl.navigateForward(url);
  }
  public userAddress : string = '';

  public displayAddress() :string {
    return this.userAddress.substr(0,4) + '...' + this.userAddress.substr(this.userAddress.length - 4, 4);
  }


  constructor(public navCtrl: NavController, private msgSvc: MessagesService, private userSvc: UsersService) {
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
    this.userAddress = this.userSvc.getCurrentUser();

  }

  async ngOnInit() {
    this.discussions = await this.msgSvc.getDiscussions();
  }

}
