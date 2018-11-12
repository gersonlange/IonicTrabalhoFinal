import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public username: string;
  public password: string;
  public msgErro;

  constructor(
    private auth: AuthService,
    private router: Router,
    public alertCtrl: AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  public doLogin() {

    const credentials = {'username': this.username, 'password': this.password};

    this.auth.postData(credentials, 'auth')
    .then(data => {

      localStorage.setItem('usuario_token', data['token']);
      localStorage.setItem('usuario_nome', data['nome']);

      this.router.navigate(['lista-professores']);
    }).catch(data => {
      this.msgErro = 'Usuario ou senha incorreta';
    });
  }

  async esqueceuSenha() {

    const prompt = await this.alertCtrl.create({
      header: 'Esqueceu a Senha?',
      message: 'Digite seu email abaixo',
      inputs: [
        {
          name: 'email',
          placeholder: 'E-mail'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            const dados = {'email' : data.email};

            this.auth.postData(dados, 'auth/esqueceu')
            .then(data1 => {
              this.mensagemSucesso();

              prompt.dismiss();
            }).catch(data1 => {
              this.mensagemErro();
            });

            return false;
          }
        }
      ]
    });
    await prompt.present();
  }

  public async mensagemSucesso() {
    const alert = await this.alertCtrl.create({
      header: 'Nova senha enviada',
      message: 'Sua nova senha foi enviada para seu email com sucesso',
      buttons: ['OK']
    });
    await alert.present();
    alert.onDidDismiss().then( datas1 => {
      this.paraLista();
    });
  }

  public async mensagemErro() {
    const alert = await this.alertCtrl.create({
      header: 'Usuário não encontrado',
      message: 'Este email não foi encontrado na base de dados',
      buttons: ['OK']
    });
    await alert.present();
  }

  async paraLista() {
    console.log(' para1');
    this.navCtrl.navigateForward('/lista-professores');
  }

}
