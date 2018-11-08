import { ProfessoresService } from './../../service/professores.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-novo-professor',
  templateUrl: './novo-professor.page.html',
  styleUrls: ['./novo-professor.page.scss'],
})
export class NovoProfessorPage implements OnInit {

  image: any;

  titulo: string;
  nomeBotao: string;

  id: any;
  nome: string;
  ativo: boolean;
  dataNascimento: any;
  curriculo: string;

  msgNome: any;
  msgDtNasc: any;
  msgCurriculo: any;

  constructor(private navCtrl: NavController,
      private professorService: ProfessoresService) { }

  ngOnInit() {
    this.titulo = 'Novo professor';
    this.image = '/assets/img/smile.png';
    this.nomeBotao = 'Criar novo professor';

    const dados = this.professorService.dadosProfessor;

    if ( dados ) {
      this.id = dados.id;
      this.titulo = 'Editar professor';
      this.nomeBotao = 'Salvar';

      this.nome = dados.nome;
      this.ativo = dados.ativo;
      this.dataNascimento = dados.dataNascimento;
      this.curriculo = dados.curriculo;

      if ( dados.imagem ) {
        this.image = dados.imagem;
      }
    }
  }

  cadastrar() {
    console.log('cadastrar');
    console.log(this.nome);
    console.log(this.ativo);
    console.log(this.dataNascimento);
    console.log(this.curriculo);

    let b = true;

    if ( ! this.nome || this.nome === '' ) {
      this.msgNome = 'Nome incorreto';
      b = false;
    }

    if ( ! this.dataNascimento ) {
      this.msgDtNasc = 'Data de nascimento incorreta';
      b = false;
    }

    if ( ! this.curriculo || this.curriculo === '' ) {
      this.msgCurriculo = 'Descrição do curriculo incorreta';
      b = false;
    }

    if ( b ) {
      this.navCtrl.navigateForward('/lista-professores');
    }
  }

}
