import { Injectable } from '@angular/core';
import * as Accounts from 'web3-eth-accounts';
import { ApiService } from '../api/api.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() {
   }

  getCurrentUser() : number {
    return 1;
  }
  private private_key: string = "";
  private wallet: any;
  private accounts: any;
  public isLoggedIn() : boolean {
    return this.wallet != null;
  }

  async login(private_key: string) : Promise<boolean> {
    try{
      this.private_key = private_key;

      let acc = Accounts.privateKeyToAccount(private_key);
      let signed = acc.sign('Login from ' + acc.address);
      /*
      console.log( "signed message : ")
      console.log(signed)
      console.log("account : ")
      console.log(acc)
    */
      console.log("recovered : " + Accounts.recover('Login from ' + acc.address , signed.signature))
      const res = await ApiService.post('/login',{public_key:acc.address, encrypted_message:signed});
      this.wallet = acc;
      console.log('login ' + private_key);
      return true;
    }
    catch(e){
      console.log(e);
      return false;
    }
  }
}
