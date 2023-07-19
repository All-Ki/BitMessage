import { Injectable } from '@angular/core';
import * as Accounts from 'web3-eth-accounts';
import { ApiService } from '../api/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private private_key: string = "";
  private wallet: any;
  private accounts: any;
  private isInitialized: boolean = false;
  async waitForReady() {
    while(!this.isInitialized){
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  constructor(private storage: StorageService) {
    this.init();
   }
   async init() {
    await this.storage.waitForReady();
    var pk =  await this.storage.get('wallet');
    if(pk != null){
      await this.login(pk);
    }
    this.isInitialized = true;
   }
   getCurrentUser() : number {
    return 1;
  }

  public async isLoggedIn() : Promise<boolean> {
    await this.storage.waitForReady();
    await this.waitForReady();
    return this.wallet != null;
  }

  async login(private_key: string) : Promise<boolean> {
    try{
      this.private_key = private_key;

      let acc = Accounts.privateKeyToAccount(private_key);
      let signed = acc.sign('Login from ' + acc.address);
      //console.log("recovered : " + Accounts.recover('Login from ' + acc.address , signed.signature))
      const res = await ApiService.post('/login',{public_key:acc.address, encrypted_message:signed});
      this.wallet = acc;
      this.storage.set('wallet', private_key);
      //console.log(await this.storage.get('wallet'))
     // console.log('login ' + private_key);
     // console.log(this.isLoggedIn())
      return true;
    }
    catch(e){
      console.log(e);
      return false;
    }
  }
}
