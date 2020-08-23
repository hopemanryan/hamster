import {Injectable} from '@angular/core';
import {from, Observable} from "rxjs";
import {nSQL} from "@nano-sql/core";

@Injectable({
  providedIn: 'root'
})
export class SqlService {

  constructor() {
  }

  addOne(tableName: string, data: any): Observable<any> {
    if(!data.id) {
      data.id = uuidv4()
    }
    return from(nSQL(tableName).query('upsert', data).exec())
  }

  getAll(tableName: string): Observable<any> {
    return from(nSQL(tableName).query('select').exec())
  }

  removeSingleById(tableName: string, id: string): Observable<any> {
    return from(nSQL(tableName).query('delete').where(['id', '=', id]).exec());
  }

  find(tableName: string, query: any[]): Observable<Array<any>> {
    return from(nSQL(tableName).query('select').where(query).exec())
  }

}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
