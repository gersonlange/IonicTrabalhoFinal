import { ActionSheetController } from '@ionic/angular';

export class EscolheFoto {
    constructor(public actionSheetCtrl: ActionSheetController) {}

    async menu() {
        console.log('escolhe foto');

        const actionSheet = await this.actionSheetCtrl.create({
          header: 'Escolha sua opção',
          buttons: [
            {
              text: 'Carregar foto da galeria',
              role: 'galeria',
              handler: () => {
                console.log('galeria');
              }
            },
            {
              text: 'Tirar foto usando a câmera',
              handler: () => {
                console.log('camera');
                this.tirarFoto();
              }
            },
            {
              text: 'Colocar avatar padrão',
              role: 'padrao',
              handler: () => {
                console.log('padrao');
              }
            }
          ]
        });

        await actionSheet.present();
      }

      tirarFoto() {
        //    const options: CameraOptions = {
        //        quality: 50,
        //        destinationType: this.camera.DestinationType.DATA_URL,
        //        encodingType: this.camera.EncodingType.JPEG,
        //        mediaType: this.camera.MediaType.PICTURE
        //    }
        //    this
        //        .camera
        //        .getPicture(options)
        //        .then((imageData) => {
        //            this.imagem = 'data:image/jpeg;base64,' + imageData;
        //            console.log('imagem', this.imagem);
        //        }, (err) => {
        //           console.log(err);
        //        });
          }
    }
