import { Router } from '@angular/router';
import { ProfessoresService } from './../../service/professores.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-professores',
  templateUrl: './lista-professores.page.html',
  styleUrls: ['./lista-professores.page.scss'],
})
export class ListaProfessoresPage implements OnInit {

  private inicio: number;

  data: any[];

  constructor(
    private professoresService: ProfessoresService,
    private router: Router,
    private professor: ProfessoresService
    ) {}

  ngOnInit() {

    this.inicio = 0;

    this.buscaBanco();

  }

  buscaBanco() {

    this.professor.getProfessores(0)
      .then(data => {

        if ( data && data.length > 0 ) {
          this.data = data;

          this.inicio = this.inicio + data.length;
        } else {
          this.buscaServidor();
        }
      });

  }

  buscaServidor() {

    this.professor.getServidor('professores')
      .then(d => {

        const count = Object.keys(d).length;

        for ( let i = 0 ; i < count ; i++) {
          this.professor.getProfessor(d[i].id)
            .then(ret => {
              if ( ret != null ) {
                this.professor.update(d[i].id, d[i].nome, d[i].dataNascimento, d[i].foto, d[i].curriculo, d[i].status);
              } else {
                this.professor.insert(d[i].id, d[i].nome, d[i].dataNascimento, d[i].foto, d[i].curriculo, d[i].status);
              }
          });
        }

        console.log('inicio');

        this.inicio = 0;

        this.buscaBanco();
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.buscaServidor();

    event.target.complete();
  }

  doInfinite(event) {

    console.log('infinite');

    this.professor.getProfessores(this.inicio)
      .then(d => {

        if ( d ) {
          const count = d.length;

          for (let i = 0; i < count; i++) {
            this.data.push( d[i] );
          }

          this.inicio = this.inicio + d.length;
          console.log(this.inicio);
        }
      });

    event.target.complete();
  }

  seleciona(dados) {
    console.log('selecionado ' + dados);

    this.professoresService.dadosProfessor = dados;

    this.router.navigate(['detalhes-professor']);
  }

  novoProfessor() {
    this.professoresService.dadosProfessor = null;

    this.router.navigate(['novo-professor']);
  }
}
