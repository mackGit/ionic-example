import { DatabaseserviceProvider } from './../../providers/databaseservice/databaseservice';
import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { TarefaEditPage } from "../tarefa-edit/tarefa-edit";

@IonicPage()
@Component({
  selector: 'page-tarefa',
  templateUrl: 'tarefa.html',
})
export class TarefaPage {

  tasks: Observable<any>;

  constructor(public navCtrl: NavController, private provider: DatabaseserviceProvider, private toast: ToastController) {

    this.tasks = this.provider.getAll();
  }

  newTask() {
    this.navCtrl.push(TarefaEditPage);
  }

  editTask(task: any) {
    this.navCtrl.push(TarefaEditPage, { task: task });
  }

  removeTask(key: string) {
    if (key) {
      this.provider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Tarefa removido sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover a tarefa.', duration: 3000 }).present();
        });
    }
  }



}
