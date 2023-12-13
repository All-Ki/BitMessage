import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MessagesService } from 'src/app/api/messages/messages.service';
import { UsersService } from 'src/app/api/users/users.service';
import { CONSTANTS } from ':common/constants';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-discussion-list',
  templateUrl: './discussion-list.page.html',
  styleUrls: ['./discussion-list.page.scss'],

})
export class DiscussionListPage implements OnInit {
  public discussions: any = [];
  public accs = [
    "0x8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f",
    "0x314125113e3e848d5a2ba23cb70d911f06155d4ee21173356f40f1335e665a53"
  ]
  constructor(public navCtrl: NavController, private msgSvc: MessagesService, private userSvc: UsersService, private clipboard: Clipboard, private _snackBar: MatSnackBar) {

    this.userAddress = this.userSvc.getCurrentUser();

  }

  public goToChat(discussion: any) {

    this.navCtrl.navigateForward(CONSTANTS.chat_page + "/" + discussion.other);
  }
  public goTo(url: string) {
    this.navCtrl.navigateForward(url);
  }
  public async changeAccount(event: any) {
    if (event == null || event == '') {
      return;
    }
    console.log(event);
    await this.userSvc.logout();
    await this.userSvc.login(event);
    this.userAddress = this.userSvc.getCurrentUser();
  }
  public userAddress: string = '';

  public displayAddress(): string {
    return this.userAddress.substr(0, 4) + '...' + this.userAddress.substr(this.userAddress.length - 4, 4);
  }

  public copyAddressToClipboard() {
    this._snackBar.open('Address copied to clipboard', 'Close', {
      duration: 1000,
    });
    console.log(this.userAddress);
    navigator.clipboard.writeText(this.userAddress);
  }

  async ngOnInit() {
    this.discussions = await this.msgSvc.getDiscussions();
    console.log(this.discussions);

  }

  logout() {
    this.userSvc.logout();
    this.navCtrl.navigateForward(['/login']);
  }
}
