import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarefaEditPage } from './tarefa-edit';

@NgModule({
  declarations: [
    TarefaEditPage,
  ],
  imports: [
    IonicPageModule.forChild(TarefaEditPage),
  ],
})
export class TarefaEditPageModule {}
