import { AuthService } from './auth.service';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { SqliteService } from './sqlite.service';
import { NOMEM } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class ProfessoresService {

  listaProfessores: any;

  dadosProfessor: any;

  constructor(
    public http: Http,
    private authService: AuthService,
    private sqlite: SqliteService ) { }

  getServidor(type) {

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

  alteraProfessor(id, nome, data_nascimento, curriculum, status, imagem) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(this.authService.getUrl() + 'professor',
        {
          id: id,
          nome: nome,
          data_nascimento: data_nascimento,
          curriculum: curriculum,
          status: status,
          imagem: imagem
        },
        {headers: headers})
      .subscribe(res => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
  }

  excluiProfessor(id) {

    this.http.delete(this.authService.getUrl() + 'professor?id=' + id, {})
      .subscribe(res => {
        console.log(res);

        const sql = 'DELETE FROM professores WHERE ' + id;

        this.sqlite.getDB().executeSql(sql, [])
        .catch((e) => console.error(e));

      }, (err) => {
        console.log(err);
      });
  }

  /**
   * Banco de dados
   */
  public getProfessor(id: number) {
    const sql = 'SELECT * FROM professores WHERE ' + id;

    return this.sqlite.getDB().executeSql(sql, [])
      .then((data: any) => {

        if (data.rows.length > 0) {

          const p = data.rows.item(0);

          const professor = { id: p.id, nome: p.nome, data_nascimento: p.data_nascimento,
            foto: p.foto, curriculum: p.curriculum, status: p.status};

          return professor;
        } else {
          return null;
        }
      })
      .catch((e) => console.error(e));
  }

  public getProfessores(inicio: number) {
    const sql = 'SELECT * FROM professores ORDER BY id LIMIT 10 OFFSET ' + inicio;

    return this.sqlite.getDB().executeSql(sql, [])
      .then((data: any) => {

        if (data.rows.length > 0) {
          const professores: any[] = [];

          for (let i = 0; i < data.rows.length; i++) {
            const p = data.rows.item(i);

            professores.push({ id: p.id, nome: p.nome, data_nascimento: p.data_nascimento,
                foto: p.foto, curriculum: p.curriculum, status: p.status});
          }

          return professores;
        } else {
          return [];
        }
      })
      .catch((e) => console.error(e));
  }

  public insert(id, nome, data_nascimento, foto, curriculo, status) {
    const sql = 'INSERT INTO professores (id, nome, data_nascimento, foto, curriculo, status) values (?, ?, ?, ?, ?, ?)';
    const data = [id, nome, data_nascimento, foto, curriculo, status ? 1 : 0];

    return this.sqlite.getDB().executeSql(sql, data)
      .catch((e) => console.error(e));
  }

  public update(id, nome, data_nascimento, foto, curriculo, status) {
    const sql = 'UPDATE professores ' +
                'SET nome = ?, ' +
                    'data_nascimento = ?, ' +
                    'foto = ?, ' +
                    'curriculo = ?, ' +
                    'status = ? ' +
                'WHERE id = ?';
    const data = [nome, data_nascimento, foto, curriculo, status ? 1 : 0, id];

    return this.sqlite.getDB().executeSql(sql, data)
      .catch((e) => console.error(e));
  }

  delete(id) {

    this.sqlite.getDB()
      .executeSql('DELETE FROM professores WHERE id=?', [id])

    .then(res => {
      console.log(res);
    })
    .catch(e => console.log(e));
  }

}
