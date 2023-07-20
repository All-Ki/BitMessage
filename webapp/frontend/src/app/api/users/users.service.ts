import { Injectable } from '@angular/core';
import * as Accounts from 'web3-eth-accounts';
import { ApiService } from '../api/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { ServiceWithInit } from 'src/app/services/service-with-init';
import { NavController } from '@ionic/angular';
import { CONSTANTS } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ServiceWithInit {
  private private_key: string = '';
  private wallet: any;
  private public_key: string = '';
  private accounts: any;

  constructor(private storage: StorageService, private navCtrl: NavController) {
    super(storage);
  }
  override async OnStorageReady() {
    var pk = await this.storage.get('wallet');
    if (pk != null) {
      if(await this.login(pk)){
        this.navCtrl.navigateRoot(CONSTANTS.discussion_list_page);
      }
    }
  }
  getCurrentUser(): string {
    return this.public_key;
  }

  public async isLoggedIn(): Promise<boolean> {
    await this.WaitUntilReady();
    return this.wallet != null;
  }

  async login(private_key: string): Promise<boolean> {
    try {

      let acc = Accounts.privateKeyToAccount(private_key);
      let signed = acc.sign('Login from ' + acc.address);
      //console.log("recovered : " + Accounts.recover('Login from ' + acc.address , signed.signature))
      const res = await ApiService.post('/login', {
        public_key: acc.address,
        encrypted_message: signed,
      });

      if(res.status != 200){
        console.log("Error");
        return false;
      }

      this.private_key = private_key;
      this.wallet = acc;
      this.public_key = acc.address;
      this.storage.set('wallet', private_key);
      //console.log(await this.storage.get('wallet'))
      // console.log('login ' + private_key);
      // console.log(this.isLoggedIn())

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  logout(){
    this.private_key = "";
    this.wallet = null;
    this.public_key = "";
    this.storage.set('wallet', null);
  }
}
