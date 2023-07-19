import { Injectable } from '@angular/core';
import * as Accounts from 'web3-eth-accounts';
import { ApiService } from '../api/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private private_key: string = '';
  private wallet: any;
  private public_key: string = '';
  private accounts: any;
  private isInitialized: boolean = false;
  async waitForReady() {
    while (!this.isInitialized) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  constructor(private storage: StorageService) {
    this.init();
  }
  async init() {
    await this.storage.waitForReady();
    var pk = await this.storage.get('wallet');
    if (pk != null) {
      await this.login(pk);
    }
    this.isInitialized = true;
  }
  getCurrentUser(): string {
    return this.public_key;
  }

  public async isLoggedIn(): Promise<boolean> {
    await this.storage.waitForReady();
    await this.waitForReady();
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
