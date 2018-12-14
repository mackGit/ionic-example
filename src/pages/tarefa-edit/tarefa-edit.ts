import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { DatabaseserviceProvider } from "../../providers/databaseservice/databaseservice";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the TarefaEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tarefa-edit',
  templateUrl: 'tarefa-edit.html',
})
export class TarefaEditPage {

  name: string;
  form: FormGroup;
  task: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder, private provider: DatabaseserviceProvider, private toast: ToastController) {

    this.task = this.navParams.data.task || { };
    this.createForm();

    this.setupPageTitle();
  }

  private setupPageTitle() {
    this.name = this.navParams.data.task ? 'Alterando tarefa' : 'Nova Tarefa';
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.task.key],
      name: [this.task.name, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Tarefa salva com sucesso.'});
          this.navCtrl.pop();
        })
        .catch((e) => {
          alert({ message: 'Erro ao salvar a tarefa. ', e });
          console.error(e);
        })
    }
  }

}
