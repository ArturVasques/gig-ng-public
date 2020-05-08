import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShareInfoService } from '../../services/share-info/share-info.service';
import { tap, take } from 'rxjs/operators';
import { GenerateMatrixService } from '../../services/generate-matrix/generate-matrix.service';
import { Observable, Subscription } from 'rxjs';
import { Info } from '../../models/info.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
export class PaymentsComponent implements OnInit, OnDestroy {

  public paymentsForm: FormGroup;
  public name: FormControl;
  public amount: FormControl;

  public table: Array<TableInfo> = [];
  public info$: Observable<Info>;

  private code = '';
  private matrix = [];

  constructor(
    private generateMatrixService: GenerateMatrixService,
    private shareInfoService: ShareInfoService
  ) { }

  ngOnInit() {
    this.initializePaymentsForm();
    this.getTableInfo();
    this.getCode();
  }

  ngOnDestroy(): void {
    this.saveTableInfo();
  }

  public onSubmit(): void {
    const name = this.name.value;
    const amount = this.amount.value;
    const code = this.code;
    const matrix = this.matrix;

    if (code) {
      const tableInfo: TableInfo = {
        name,
        amount,
        code,
        matrix
      };

      this.table.push(tableInfo);
      this.name.setValue('');
      this.amount.setValue('');
    }
  }

  private saveTableInfo(): void {
    this.shareInfoService.saveTableInfo(this.table);
  }

  private getTableInfo(): void {
    this.shareInfoService.getTableInfo()
      .pipe(
        take(1),
        tap((tableInfo) => {
          this.table = tableInfo;
        })
      )
      .subscribe();
  }

  private getCode(): void {
    this.info$ = this.generateMatrixService.getInfo()
    .pipe(
      tap((info) => {
        if (info) {
          this.matrix = info.matrix;
          this.code = info.code;
        }
      })
    );
  }

  private initializePaymentsForm(): void {
    this.name = new FormControl('', Validators.required);
    this.amount = new FormControl('', Validators.required);
    this.paymentsForm = new FormGroup({
      name: this.name,
      amount: this.amount
    });
  }

}
