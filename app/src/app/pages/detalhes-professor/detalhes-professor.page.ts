import { EscolheFoto } from './../../components/escolhe-foto';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProfessoresService } from '../../service/professores.service';
//import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-detalhes-professor',
  templateUrl: './detalhes-professor.page.html',
  styleUrls: ['./detalhes-professor.page.scss'],
})
export class DetalhesProfessorPage implements OnInit {

  data: any;
  imagem: any;

  constructor(
    private professorService: ProfessoresService,
    private router: Router,
    private escolheFoto: EscolheFoto) { }

  ngOnInit() {
    this.data = this.professorService.dadosProfessor;

    if ( this.data.foto == null ) {
      this.imagem = 'assets/img/smile.png';
    } else {
      this.imagem = 'data:image/jpeg;base64,' + this.data.foto;
    }
  }

  escolherFoto() {
    this.escolheFoto.menu();
  }

  excluir () {
    console.log(this.data.id);
  }

  editaProfessor() {
    this.router.navigate(['novo-professor']);
  }
}
