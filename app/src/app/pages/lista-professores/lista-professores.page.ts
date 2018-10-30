import { ProfessoresService } from './../../service/professores.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-professores',
  templateUrl: './lista-professores.page.html',
  styleUrls: ['./lista-professores.page.scss'],
})
export class ListaProfessoresPage implements OnInit {

  data: {};

  constructor(private professoresService: ProfessoresService) {}

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
}
