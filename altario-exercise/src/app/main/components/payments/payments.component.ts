import { Component, OnInit } from '@angular/core';
import { ShareInfoService } from '../../services/share-info/share-info.service';
import { tap } from 'rxjs/operators';
import { GenerateMatrixService } from '../../services/generate-matrix/generate-matrix.service';
import { Observable } from 'rxjs';
import { Info } from '../../models/info.model';

export interface TableInfo {
  name: string;
  amount: string;
  code: string;
  matrix: Array<Array<string>>;
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  public paymentName = '';
  public paymentAmount = '';
  public table: Array<TableInfo> = [];
  public info$: Observable<Info>;
  private code = '';
  private matrix = [];

  constructor(
    private generateMatrixService: GenerateMatrixService,
    private shareInfoService: ShareInfoService
  ) { }

  ngOnInit() {
    this.getTableInfo();
    this.getCode();
  }

  ngOnDestroy(): void {
    this.saveTableInfo();
  }

  public onClickAdd(): void {
    if(this.paymentName !== '' && this.paymentAmount !== '' && this.code !== '') {
      const tableInfo: TableInfo = {
        name: this.paymentName,
        amount: this.paymentAmount,
        code: this.code,
        matrix: this.matrix
      }
      this.table.push(tableInfo)
      this.paymentName = '';
      this.paymentAmount = '';
    }
  }

  private saveTableInfo(): void {
    this.shareInfoService.saveTableInfo(this.table);
  }

  private getTableInfo(): void {
    this.table = this.shareInfoService.getTableInfo();
  }

  private getCode(): void {
    this.info$ = this.generateMatrixService.getInfo()
    .pipe(
      tap((info) => {
        if(info) {
          this.matrix = info.matrix;
          this.code = info.code
        }
      })
    );
  }

}
