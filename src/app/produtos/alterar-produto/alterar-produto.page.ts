/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/Models/Produto';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alterar-produto',
  templateUrl: './alterar-produto.page.html',
  styleUrls: ['./alterar-produto.page.scss'],
})
export class AlterarProdutoPage implements OnInit {

  produto: Produto = new Produto();

  constructor(private prodService: ProdutoService,
              private route: Router,
              private rotaAtiva: ActivatedRoute) {
                this.produto.id = this.rotaAtiva.snapshot.params.id;
              }

  ngOnInit() {
    this.prodService.buscarPorId(this.produto.id).subscribe(dados => {
      this.produto.nome = dados['nome'];
      this.produto.valor = dados['valor'];
    });
  }

  salvar(){
    this.prodService.alterar(this.produto);
    this.route.navigateByUrl('/');
  }

}
