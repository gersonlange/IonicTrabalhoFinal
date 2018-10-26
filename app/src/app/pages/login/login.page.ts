import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
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
    private router: Router
  ) { }

  ngOnInit() {
  }

  doLogin() {
    this.auth.postData(this.userData, 'auth')
    .then(data => {

      localStorage.setItem('usuario_token', data['token']);
      localStorage.setItem('usuario_nome', data['nome']);

      this.router.navigate(['lista-professores']);
    }).catch(data => {
      console.log(data);
      this.msgErro = 'Usuario ou senha incorreta';
    });
  }

}
