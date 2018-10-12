import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userData = {'username': '', 'password': ''};

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  doLogin() {

    this.auth.postData(this.userData, 'auth')
    .then(data => {
      console.log(data);

      localStorage.setItem('key', 'conectado');

//      this.router.navigate(['home']);
    }).catch;
  }

}
