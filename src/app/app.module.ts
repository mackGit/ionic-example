import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapaPage } from '../pages/mapa/mapa';
import { TarefaEditPage } from "../pages/tarefa-edit/tarefa-edit";
import { ProdutoPage } from '../pages/produto/produto';
import { TarefaPage } from '../pages/tarefa/tarefa';
import { LoginPage } from '../pages/login/login';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { TrabalhoProvider } from '../providers/trabalhoprovider/trabalhoprovider';
import { DatabaseserviceProvider } from '../providers/databaseservice/databaseservice';
import { FirebaseService } from '../services/firebase.service'
import { GooglePlus } from '@ionic-native/google-plus';


import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import {AuthService} from "../services/auth.service";
import { AngularFireAuthModule } from 'angularfire2/auth';
import {RegisterPage} from "../pages/register/register";
import { AngularFirestoreModule } from 'angularfire2/firestore';


export const firebaseConfig = {
  apiKey: "AIzaSyA6v_aNShdSVzDaGDuZdkz111wTiFrvadc",
  authDomain: "trabalho-ionic-222719.firebaseapp.com",
  databaseURL: "https://trabalho-ionic-222719.firebaseio.com",
  projectId: "trabalho-ionic-222719",
  storageBucket: "trabalho-ionic-222719.appspot.com",
  messagingSenderId: "575572897459"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapaPage,
    ProdutoPage,
    TarefaPage,
    LoginPage,
    RegisterPage,
    TarefaEditPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapaPage,
    ProdutoPage,
    TarefaPage,
    LoginPage,
    RegisterPage,
    TarefaEditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    GoogleMaps,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TrabalhoProvider,
    DatabaseserviceProvider,
    AngularFireAuthModule,
    AuthService,
    FirebaseService,
    GooglePlus
  ]
})
export class AppModule {}
