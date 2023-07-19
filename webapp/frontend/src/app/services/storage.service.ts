import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _isReady: boolean = false;
  public async waitForReady() {
    while(!this._isReady){
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    this._isReady = true;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }
  public async get(key: string) {
    console.log("get " + key)
    console.log(this._storage)
    return await this._storage?.get(key);
  }
}