import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CONSTANTS } from ':common/constants';
import { UserSettings } from ':common/models';
import { UsersService } from 'src/app/api/users/users.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public navCtrl: NavController, private userSvc:UsersService) { }
  public currentSettings: UserSettings = new UserSettings();



  goToDiscussionList(){
    this.navCtrl.navigateForward(CONSTANTS.discussion_list_page);
  }

  async saveSettings(){
    console.log(this.currentSettings);
   console.log(await this.userSvc.saveUserSettings(this.currentSettings));
  }
  async ngOnInit() {
    this.currentSettings = await this.userSvc.getUserSettings();
  }
}
