import { SqliteService } from './service/sqlite.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Novo Professor',
      url: '/novo-professor',
      icon: 'person-add'
    },
    {
      title: 'Lista de Professores',
      url: '/lista-professores',
      icon: 'grid'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private sqlite: SqliteService
  ) {
    this.initializeApp();
  }

  showSplash = true; // <-- show animation

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();

      this.sqlite.createDatabase();

      this.splashScreen.hide();

      timer(3000).subscribe(() => this.showSplash = false);
    });
  }

  logout() {
    localStorage.removeItem('usuario_token');
    this.sqlite.drop();

    this.router.navigate(['']);
  }
}
