import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  private db: SQLiteObject;

  constructor(public platform: Platform, private sqlite: SQLite) { }

  public getDB() {
    return this.db;
  }

  public createDatabase() {
    return this.sqlite.create({
        name: 'trabalho.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {

        // Criando as tabelas
        this.createTables(db);

        this.db = db;
      })
      .catch(e => console.log(e));
  }

  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.executeSql(
      'create table if not exists professores (' +
          'id integer primary key AUTOINCREMENT NOT NULL, ' +
          'nome TEXT, ' +
          'data_nascimento TEXT, ' +
          'foto TEXT, ' +
          'curriculo TEXT, ' +
          'status integer)', [])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  public drop() {
    this.sqlite.deleteDatabase({
        name: 'trabalho.db',
        location: 'default'
      })
    .then(() => console.log('drop Tabelas'))
    .catch(e => console.error('Erro ao excluir as tabelas', e));
  }
}
