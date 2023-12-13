import { StorageService } from './storage.service';

export class ServiceWithInit {
  private isReady = false;

  async WaitUntilReady() {
    console.log('waiting');
    while (!this.isReady) {
      console.log('waiting');
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    console.log('ready');
  }
  constructor(storage: StorageService) {
    this.init(storage);
  }
  protected async OnStorageReady() {}
  private async init(storage: StorageService) {
    await storage.waitForReady();
    await this.OnStorageReady();
    this.isReady = true;
  }
}
