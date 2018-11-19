import { ProfessoresService } from './../../service/professores.service';
import { NavController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-novo-professor',
  templateUrl: './novo-professor.page.html',
  styleUrls: ['./novo-professor.page.scss'],
})
export class NovoProfessorPage implements OnInit {

  image: any;
  fotoPadrao: any;

  titulo: string;
  nomeBotao: string;

  id: any;
  nome: string;
  ativo: boolean;
  data_nascimento: any;
  curriculo: string;

  msgNome: any;
  msgDtNasc: any;
  msgCurriculo: any;

  constructor(private navCtrl: NavController,
      private professorService: ProfessoresService,
      public actionSheetCtrl: ActionSheetController,
      private camera: Camera,
      private toastController: ToastController) { }

  ngOnInit() {
    this.fotoPadrao = '/assets/img/smile.png';

    this.titulo = 'Novo professor';
    this.image = this.fotoPadrao;
    this.nomeBotao = 'Criar novo professor';

    const dados = this.professorService.dadosProfessor;

    if ( dados ) {
      this.id = dados.id;
      this.titulo = 'Editar professor';
      this.nomeBotao = 'Salvar';

      this.nome = dados.nome;
      this.ativo = dados.ativo;
      this.data_nascimento = dados.data_nascimento;
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
    console.log(this.data_nascimento);
    console.log(this.curriculo);

    let b = true;

    if ( ! this.nome || this.nome === '' ) {
      this.msgNome = 'Nome incorreto';
      b = false;
    }

    if ( ! this.data_nascimento ) {
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

  escolheFoto() {
    this.menu();
  }

  async menu() {

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Escolha sua opção',
      buttons: [
        {
          text: 'Carregar foto da galeria',
          role: 'galeria',
          handler: () => {
            this.buscarFotoGaleria();
          }
        },
        {
          text: 'Tirar foto usando a câmera',
          handler: () => {
            this.tirarFoto();
          }
        },
        {
          text: 'Colocar avatar padrão',
          role: 'padrao',
          handler: () => {
            this.image = this.fotoPadrao;
            this.toast();
          }
        }
      ]
    });

    await actionSheet.present();
  }

  buscarFotoGaleria() {
    const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE };

   this.camera
        .getPicture(options)
        .then((imageData) => {
            this.image = 'data:image/jpeg;base64,' + imageData;
            this.salvar();
            this.toast();
        }, (err) => {
            console.log(err);
        });
}
  tirarFoto() {
    const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    };

    this
        .camera
        .getPicture(options)
        .then((imageData) => {
            this.image = 'data:image/jpeg;base64,' + imageData;
            this.salvar();
            this.toast();
        }, (err) => {
           console.log(err);
        });
  }

  public salvar() {
    this.professorService.alteraProfessor(
          this.id,
          this.nome,
          this.data_nascimento,
          this.curriculo,
          true,
          this.image);
  }

  async toast() {
    const toast = await this.toastController.create({
      message: 'Foto alterada',
      duration: 2000
    });
    toast.present();
  }

}
