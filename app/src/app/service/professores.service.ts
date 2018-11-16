import { AuthService } from './auth.service';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfessoresService {

  listaProfessores: any;

  dadosProfessor: any;

  constructor(public http: Http,
    private authService: AuthService) { }

  getData(type) {

    return new Promise((resolve, reject) => {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.get(this.authService.getUrl() + type,
           {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

}
