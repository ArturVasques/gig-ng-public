import { Component, OnInit } from '@angular/core';
import { GenerateMatrixService } from '../../services/generate-matrix/generate-matrix.service';
import { Observable, timer } from 'rxjs';
import { Info } from '../../models/info.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})


export class GeneratorComponent implements OnInit {

  public generatorForm: FormGroup;
  public character: FormControl;

  public info$: Observable<Info>;

  constructor(
    private generateMatrixService: GenerateMatrixService
  ) { }

  ngOnInit() {
    this.initializeGeneratorForm();
    this.info$ = this.generateMatrixService.getInfo();
  }

  public onSubmit(): void {
    const weightConstant = this.character.value;

    this.generateMatrixService.setWeightConstant(weightConstant);
    this.character.disable();

    timer(4000).subscribe(
      () => {
        this.character.enable();
        this.character.setValue('');
      }
    );
  }

  private initializeGeneratorForm(): void {
    this.character = new FormControl('');
    this.generatorForm = new FormGroup({
      character: this.character
    });
  }

}
