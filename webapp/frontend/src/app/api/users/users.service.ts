import { Injectable } from '@angular/core';
import * as Accounts from 'web3-eth-accounts';
import { ApiService } from 'src/app/api/api/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { ServiceWithInit } from 'src/app/services/service-with-init';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CONSTANTS } from ':common/constants';
import { UserSettings } from ':common/models';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ServiceWithInit {
  private wallet: any;
  private accounts: any;
  private userSettings: UserSettings  = new UserSettings();

  constructor(private storage: StorageService, private navCtrl: NavController, private router:Router) {
    super(storage);
  }
  override async OnStorageReady() {
    var pk = await this.storage.get('wallet');
    if (pk != null) {
      if(await this.login(pk) && this.router.url == '/login'){
        this.userSettings = await this.storage.get('userSettings') || new UserSettings();
        this.navCtrl.navigateRoot(CONSTANTS.discussion_list_page);
      }
    }
  }

  getCurrentUser(): string {
    return this.wallet.address;
  }

  public async isLoggedIn(): Promise<boolean> {
    await this.WaitUntilReady();
    return this.wallet != null;
  }

  async login(private_key: string): Promise<boolean> {
    try {

      let acc = Accounts.privateKeyToAccount(private_key);
      let signed = acc.sign('Login from ' + acc.address);
      const res = await ApiService.post('/login', {
        public_key: acc.address,
        encrypted_message: signed,
      });

      if(res.status != 200){
        console.log("Error");
        return false;
      }
      this.wallet = acc;
      this.storage.set('wallet', acc.privateKey);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  public async saveUserSettings(userSettings: UserSettings) : Promise<boolean>{
    try{
      this.userSettings = userSettings;
      await this.storage.set('userSettings', this.userSettings);
      return true;
    }
    catch(e){
      console.log(e);
      return false;
    }
  }

  public async getUserSettings(): Promise<UserSettings>{
    await this.WaitUntilReady();
    return this.userSettings;
  }
  logout(){
    this.wallet = null;
    this.storage.clear();
  }
}
