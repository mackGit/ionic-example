import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';

import {RegisterPage} from '../register/register';
import {HomePage} from '../home/home';

import {AuthService} from '../../services/auth.service';

import { GooglePlus } from '@ionic-native/google-plus';

import {LoadingController} from 'ionic-angular';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  validations_form: FormGroup;
  errorMessage: string = '';
  user:any = {};

  validation_messages = {
    'email': [
      {type: 'required', message: 'Email is required.'},
      {type: 'pattern', message: 'Please enter a valid email.'}
    ],
    'password': [
      {type: 'required', message: 'Password is required.'},
      {type: 'minlength', message: 'Password must be at least 5 characters long.'}
    ]
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public googlePlus:GooglePlus
  ) {
  }

  ionViewWillLoad() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  loginWithGoogle(){
    this.googlePlus.login({})
      .then(res => {
        console.log("RES: "+res);
      })
      .catch(err => console.error(err));
  }

  tryLogin(value) {
    const loader = this.loadingCtrl.create({
      content: "Entrando...",
    });
    loader.present()
      .then(asd => {
        this.authService.doLogin(value)
          .then(res => {
            this.navCtrl.push(HomePage);
            loader.dismissAll();
          }, err => {
            this.errorMessage = err.message;
            loader.dismissAll();
          })
      });


  }

  goRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

}
