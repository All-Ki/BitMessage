import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class IonLoaderService {
  constructor(public loadingController: LoadingController) { }

  // Simple loader
  async simpleLoader() {
    const loader = await this.loadingController.create({
      message: 'Loading...' });
      await loader.present();

  }
  // Dismiss loader
  dismissLoader() {
    this.loadingController.dismiss().then((response) => {
      console.log('Loader closed!', response);
    }).catch((err) => {
      console.log('Error occured : ', err);
    });
  }
}