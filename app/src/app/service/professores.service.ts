import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

const apiUrl = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class ProfessoresService {

  listaProfessores: any;

  constructor(public http: Http) { }

  getData(type) {

    return new Promise((resolve, reject) => {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.get(apiUrl + type,
           {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

}
