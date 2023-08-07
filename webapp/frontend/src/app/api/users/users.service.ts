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
  private user_settings: UserSettings  = new UserSettings();

  constructor(private storage: StorageService, private navCtrl: NavController, private router:Router) {
    super(storage);
  }
  override async OnStorageReady() {
    var pk = await this.storage.get('wallet');
    if (pk != null) {
      if(await this.login(pk) && this.router.url == '/login'){
        this.user_settings = await this.storage.get('user_settings') || new UserSettings();
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
      let signed = acc.sign('Login from ' + acc.address).signature;
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
      this.user_settings = userSettings;
      await this.storage.set('user_settings', this.user_settings);
      const nonce = await this.getNonce(CONSTANTS.Actions.update_settings);
      const headers = this.buildHeaders(CONSTANTS.Actions.update_settings, nonce);
      await ApiService.post('/user_settings', this.user_settings, {headers: headers});
      return true;
    }
    catch(e){
      console.log(e);
      return false;
    }
  }
  public async getUserSettings(): Promise<UserSettings>{
    await this.WaitUntilReady();
    return this.user_settings;
  }
  public async getNonce(request_type: string): Promise<string> {
    await this.WaitUntilReady();
    return (await ApiService.generateNonce(this.wallet.address,request_type)).data.nonce as any;
  }
  logout(){
    this.wallet = null;
    this.storage.clear();
  }

  public signMessage(request_type: string, nonce: string): string {
    return this.wallet.sign("" + request_type + nonce).signature;
  }

  public buildHeaders(request_type: string, nonce: string): any {
    return ApiService.buildHeaders(this.wallet.address, this.signMessage(request_type, nonce));
  }
}
