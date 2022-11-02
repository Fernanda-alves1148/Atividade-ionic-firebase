/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../Models/Produto';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public listaProdutos: Produto[] = [];

  constructor(private prodService: ProdutoService,
              private alertController: AlertController) {}

  ngOnInit(){
    this.buscarProdutos();
  }

  buscarProdutos(){
    this.prodService.buscarProdutos().subscribe(dadosRetorno => {this.listaProdutos = dadosRetorno.map(
      registro => ({
        id: registro.payload.doc.id,
        nome: registro.payload.doc.data()['nome'],
        valor: registro.payload.doc.data()['valor']
      }
      ));
    });
  }
  async deletarProduto(id: string){
    const alert = await this.alertController.create({
      header: 'Confirma exclusão desse produto?',
      buttons:[
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'sim',
          role: 'confirm',
          handler: () => {
            this.prodService.deletar(id);
          },
        },
      ],
    });
    await alert.present();
    this.buscarProdutos();
  }



}
