import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async showToast(message) {
      const toast = await this.toastController.create({
          header: "",
          message,
          position: 'bottom',
          duration: 3000,
      });

      toast.present();
  }

}
