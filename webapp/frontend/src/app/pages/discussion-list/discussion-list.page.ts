import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MessagesService } from 'src/app/api/messages/messages.service';
import { UsersService } from 'src/app/api/users/users.service';
import { CONSTANTS } from ':common/constants';
import { EncryptionService } from 'src/app/services/encryption.service';
@Component({
  selector: 'app-discussion-list',
  templateUrl: './discussion-list.page.html',
  styleUrls: ['./discussion-list.page.scss'],
})
export class DiscussionListPage implements OnInit {
  public discussions : any = [];

  public goToChat(discussion : any){

    this.navCtrl.navigateForward(CONSTANTS.chat_page+"/"+discussion.other);
  }
  public goTo(url : string){
    this.navCtrl.navigateForward(url);
  }
  public userAddress : string = '';

  public displayAddress() :string {
    return this.userAddress.substr(0,4) + '...' + this.userAddress.substr(this.userAddress.length - 4, 4);
  }


  constructor(public navCtrl: NavController, private msgSvc: MessagesService, private userSvc: UsersService) {

    this.userAddress = this.userSvc.getCurrentUser();

  }

  async ngOnInit() {
    this.discussions = await this.msgSvc.getDiscussions();
    console.log(this.discussions);
    const k = await EncryptionService.generateRSAKeyPairFromPublicAndPrivateKey("test");
    console.log(k);
  }

  logout(){
    this.userSvc.logout();
    this.navCtrl.navigateForward(['/login']);
  }
}
