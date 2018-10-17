import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  userData = {'username': '', 'password': ''};
  msgErro;

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {

    if ( localStorage.getItem('usuario_token') != null )
      this.router.navigate(['home']);
  }

  doLogin() {

    this.auth.postData(this.userData, 'auth')
    .then(data => {

      console.log(data);
      console.log(data['token']);

      localStorage.setItem('usuario_token', data['token']);
      localStorage.setItem('usuario_nome', data['nome']);

      this.router.navigate(['home']);
    }).catch(data => {
      console.log(data);
      this.msgErro = "Usuario ou senha incorreta";
    });
  }

}
