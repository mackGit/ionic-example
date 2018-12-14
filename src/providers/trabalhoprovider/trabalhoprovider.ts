import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


/*
  Generated class for the ProdutoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TrabalhoProvider {

  lista:any[];
  chave:string = "produtos";

  constructor(private storage: Storage) {
    this.storage.ready().then(()=>{
      this.storage.get(this.chave).then((registros) => {
        if(registros){
          this.lista = registros;
        }else{
          this.lista = [];
        }
      });

    });

  }

  listar(){
    return this.lista;
  }
  adicionar(registro:any){
    this.storage.ready().then(()=>{
      this.lista.push(registro);
      this.storage.set(this.chave, this.lista);
    });
  }
  atualizar(produto,dados){
    for(let chave in this.lista){
      if(this.lista[chave] == produto){
        this.lista[chave]= dados;
        this.storage.set(this.chave, this.lista);
      }
    }
  }

  deletar(produto){
    for(let chave in this.lista){
      if(this.lista[chave] == produto){
        this.lista.splice(parseInt(chave),1);
        this.storage.set(this.chave, this.lista);
      }
    }
  }

}
