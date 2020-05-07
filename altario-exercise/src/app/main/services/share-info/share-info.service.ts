import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { Info } from '../../models/info.model';
import { TableInfo } from '../../components/payments/payments.component';

@Injectable({
  providedIn: 'root'
})
export class ShareInfoService {

  private currentTableInfo: Array<TableInfo> = [];

  constructor() { }

  public saveTableInfo(tableInfo: Array<TableInfo>): void {
    this.currentTableInfo = tableInfo;
  }

  public getTableInfo(): Array<TableInfo> {
    return this.currentTableInfo;
  }
}
