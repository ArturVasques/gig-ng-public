import { Component, OnInit } from '@angular/core';
import { Position } from '../../models/position.model';
import { ShareInfoService } from '../../services/share-info/share-info.service';
import { tap, map } from 'rxjs/operators';
import { GenerateMatrixService } from '../../services/generate-matrix/generate-matrix.service';
import { Subscription, Observable } from 'rxjs';
import { Info } from '../../models/info.model';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})


export class GeneratorComponent implements OnInit {

  public inputDisabled = false;
  public inputCharacter = '';
  public info$: Observable<Info>;

  constructor(
    private generateMatrixService: GenerateMatrixService
  ) { }

  ngOnInit() {
    this.info$ = this.generateMatrixService.getInfo();
  }

  public onClickGenerateGrid(): void {
    this.generateMatrixService.setWeightConstant(this.inputCharacter);
    this.inputDisabled = true;
    setTimeout(() => {
      this.inputDisabled = false;
      this.inputCharacter = '';
    }, 4000);

  }

}
