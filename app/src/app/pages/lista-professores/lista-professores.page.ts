import { Router } from '@angular/router';
import { ProfessoresService } from './../../service/professores.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-professores',
  templateUrl: './lista-professores.page.html',
  styleUrls: ['./lista-professores.page.scss'],
})
export class ListaProfessoresPage implements OnInit {

  data: {};

  constructor(
    private professoresService: ProfessoresService,
    private router: Router
    ) {}

  ngOnInit() {
    this.dados();
  }

  doRefresh(event) {
    console.log('Begin async operation');

    this.dados();

    event.target.complete();
  }

  dados() {
      this.professoresService.getData('professores')
        .then(data => {
          this.data = data;
        });
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
