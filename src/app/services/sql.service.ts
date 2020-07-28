import { Injectable } from '@angular/core';
import {from, Observable} from "rxjs";
import {nSQL} from "@nano-sql/core";

@Injectable({
  providedIn: 'root'
})
export class SqlService {

  constructor() { }

  addOne(tableName: string, data: any): Observable<any> {
    return from(nSQL(tableName).query('upsert', data).exec())
  }

  getAll(tableName: string) {
    return from(nSQL(tableName).query('select').exec())
  }
}
