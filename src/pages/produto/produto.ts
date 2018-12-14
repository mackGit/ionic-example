import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TrabalhoProvider } from '../../providers/trabalhoprovider/trabalhoprovider';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ProdutoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

interface IProduto{
  descricao:string;
  preco:number;
}

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {

  produto:IProduto = {descricao:'',preco:0};
  produtos:IProduto[];
  editando:boolean = false;
  produtoEditando:IProduto;

  constructor(public navCtrl: NavController, public navParams: NavParams, public trabalhoProvider:TrabalhoProvider, public alertCtrl: AlertController) {
  }

  ionViewDidEnter() {
    this.produtos = this.trabalhoProvider.listar();
  }

  adicionar(){
    if(this.produto.descricao != "" && this.produto.preco != 0){
      this.trabalhoProvider.adicionar(this.produto);
      this.produto = {descricao:'',preco:0};
    }

  }

  editar(produto:IProduto){
    this.produto = {descricao:produto.descricao,preco:produto.preco};
    this.editando = true;
    this.produtoEditando = produto;
  }
  cancelarEditarProduto(){
    this.produto = {descricao:'',preco:0};
    this.editando = false;
  }
  atualizar(){
    if(this.produto.descricao != "" && this.produto.preco != 0){
      this.trabalhoProvider.atualizar(this.produtoEditando,this.produto);
      this.cancelarEditarProduto();
    }
  }

  deletar(produto:IProduto){

    const confirm = this.alertCtrl.create({
      title: 'Tem certeza que deseja deletar?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Exclusão cancelada');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.trabalhoProvider.deletar(produto);
            console.log('Exclusão Confirmada');
          }
        }
      ]
    });
    confirm.present();


  }

}
