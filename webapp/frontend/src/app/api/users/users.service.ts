import { Injectable } from '@angular/core';
import * as Accounts from 'web3-eth-accounts';
import { ApiService } from 'src/app/api/api/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { ServiceWithInit } from 'src/app/services/service-with-init';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CONSTANTS } from ':common/constants';
import { UserSettings } from ':common/models';
import { EncryptionService } from 'src/app/services/encryption.service';
import { IonLoaderService } from 'src/app/ion-loader.service';
@Injectable({
  providedIn: 'root',
})
export class UsersService extends ServiceWithInit {
  private wallet: Accounts.Web3Account | null = null;
  private user_settings: UserSettings = new UserSettings();
  private rsa_keypair: any;
  constructor(
    private storage: StorageService,
    private navCtrl: NavController,
    private router: Router,
    private IonLoaderService: IonLoaderService
  ) {
    super(storage);
  }
  override async OnStorageReady() {
    console.log('storage ready');
    var pk = await this.storage.get('wallet');
    this.rsa_keypair = await this.storage.get('rsa_keypair');
    //console.log(JSON.parse(this.rsa_keypair));
    if (this.rsa_keypair != null) {
      this.rsa_keypair = EncryptionService.key_from_storage(this.rsa_keypair);
      //  console.log(this.rsa_keypair);
    }
    if (pk != null) {
      if ((await this.login(pk)) && this.router.url == '/login') {
        this.user_settings =
          (await this.storage.get('user_settings')) || new UserSettings();
        this.navCtrl.navigateRoot(CONSTANTS.discussion_list_page);
      }
    }
  }

  getCurrentUser(): string {
    console.log(this.wallet);
    return this.wallet?.address || '';
  }

  public async isLoggedIn(): Promise<boolean> {
    await this.WaitUntilReady();
    return this.wallet != null;
  }

  async login(private_key: string): Promise<boolean> {
    //await this.WaitUntilReady();
    //if (await this.isLoggedIn()) {
    //  await this.logout();
    //}
    try {
      await this.IonLoaderService.simpleLoader();
      let acc = Accounts.privateKeyToAccount(private_key);
      if (this.rsa_keypair == null) {
        this.rsa_keypair =
          await EncryptionService.generateRSAKeyPairFromPrivateKey(private_key);
        //console.log(this.rsa_keypair);
        this.storage.set(
          'rsa_keypair',
          EncryptionService.key_to_storage(this.rsa_keypair)
        );
      }
      const public_key_pem = EncryptionService.public_key_pem(this.rsa_keypair);

      let signed = acc.sign(
        'Login from ' + acc.address + public_key_pem
      ).signature;
      const res = await ApiService.post('/login', {
        public_key: acc.address,
        encrypted_message: signed,
        rsa_public_key: public_key_pem,
      });

      if (res.status != 200) {
        console.log(
          'Error during login : ' + res.status + ' ' + res.statusText
        );
        return false;
      }
      this.wallet = acc;
      this.storage.set('wallet', acc.privateKey);
      await this.IonLoaderService.dismissLoader();

      return true;
    } catch (e) {
      console.log(e);
      //this.IonLoaderService.dismissLoader();

      return false;
    } finally {
    }
  }
  public async saveUserSettings(userSettings: UserSettings): Promise<boolean> {
    try {
      this.user_settings = userSettings;
      await this.storage.set('user_settings', this.user_settings);
      const nonce = await this.getNonce(CONSTANTS.Actions.update_settings);
      const headers = this.buildHeaders(
        CONSTANTS.Actions.update_settings,
        nonce
      );
      await ApiService.post('/user_settings', this.user_settings, {
        headers: headers,
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  public async getUserSettings(): Promise<UserSettings> {
    await this.WaitUntilReady();
    return this.user_settings;
  }
  public async getNonce(request_type: string): Promise<string> {
    await this.WaitUntilReady();
    return (await ApiService.generateNonce(this.getCurrentUser(), request_type))
      .data.nonce as any;
  }
  logout() {
    this.wallet = null;
    this.rsa_keypair = null;
    this.storage.clear();
  }

  public signMessage(request_type: string, nonce: string): string {
    return this.wallet?.sign('' + request_type + nonce).signature || '';
  }

  public buildHeaders(request_type: string, nonce: string): any {
    return ApiService.buildHeaders(
      this.getCurrentUser(),
      this.signMessage(request_type, nonce)
    );
  }
  public get_pk(): string {
    return this.wallet?.privateKey || '';
  }
}
