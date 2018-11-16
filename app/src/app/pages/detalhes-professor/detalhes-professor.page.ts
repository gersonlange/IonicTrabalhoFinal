import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ProfessoresService } from '../../service/professores.service';

@Component({
  selector: 'app-detalhes-professor',
  templateUrl: './detalhes-professor.page.html',
  styleUrls: ['./detalhes-professor.page.scss'],
})
export class DetalhesProfessorPage implements OnInit {

  data: any;
  imagem: any;
  fotoPadrao: any;

  constructor(
    private professorService: ProfessoresService,
    private router: Router,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera) { }

  ngOnInit() {
    this.data = this.professorService.dadosProfessor;
    this.fotoPadrao =  'assets/img/smile.png';

    if ( this.data.foto == null ) {
      this.imagem = this.fotoPadrao;
    } else {
      this.imagem = 'data:image/jpeg;base64,' + this.data.foto;
    }
  }

  escolherFoto() {
    this.menu();
  }

  excluir () {
    console.log(this.data.id);
  }

  editaProfessor() {
    this.router.navigate(['novo-professor']);
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
            this.imagem = this.fotoPadrao;
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
        mediaType: this.camera.MediaType.PICTURE
    }
    this
        .camera
        .getPicture(options)
        .then((imageData) => {
            this.imagem = 'data:image/jpeg;base64,' + imageData;
            this.salvaFoto();
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
    }
    this
        .camera
        .getPicture(options)
        .then((imageData) => {
            this.imagem = 'data:image/jpeg;base64,' + imageData;
            this.salvaFoto();
        }, (err) => {
           console.log(err);
        });
  }

  public salvaFoto() {
//    this.professorService.alteraProfessor(
//          this.professor._id,
//          this.professor.name,
//          this.professor.birthDate = new Date().toISOString(),
//          this.professor.curriculum,
//          this.professor.status,
//          this.imagem)
//        .pipe(first())
//        .subscribe(
//            result => this.router.navigate(['/lista-professores']),
//            err => this.error = 'Erro ao alterar o professor'
//        );
  }

}
