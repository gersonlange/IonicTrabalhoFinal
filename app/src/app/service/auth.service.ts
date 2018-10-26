import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

const apiUrl = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: Http) { }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(apiUrl + type,
           JSON.stringify(credentials),
           {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
}