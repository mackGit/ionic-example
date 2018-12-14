import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { MapaPage } from '../mapa/mapa';
import {ProdutoPage} from "../produto/produto";
import {TarefaPage} from "../tarefa/tarefa";
import {AuthService} from "../../services/auth.service";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  errorMessage: string = '';
  base64Image:string;
  constructor(public navCtrl: NavController,private camera: Camera, private authService: AuthService,) {

  }
  //https://console.developers.google.com/apis/dashboard
  // android: AIzaSyBVbiPDS0ywchjknCMEo31ZABBI2pVRL8E  ios: AIzaSyAYouO7iA5u7rOMJJet8V7P1_QfX5S7HME

  // ionic cordova plugin add https://github.com/mapsplugin/cordova-plugin-googlemaps#multiple_maps --variable API_KEY_FOR_ANDROID="AIzaSyBVbiPDS0ywchjknCMEo31ZABBI2pVRL8E" --variable API_KEY_FOR_IOS="AIzaSyAYouO7iA5u7rOMJJet8V7P1_QfX5S7HME"

  abreMapa(){
    this.navCtrl.push(MapaPage);
  }

  abreSqlite(){
    this.navCtrl.push(ProdutoPage);
  }

  abreRealtimeDatabase(){
    this.navCtrl.push(TarefaPage);
  }

  deslogar(){
    this.authService.doLogout()
      .then(res => {
        this.navCtrl.push(LoginPage);
      }, err => {
        this.errorMessage = err;
      })
  }

  abreCamera(){
    let config:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(config).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

}
