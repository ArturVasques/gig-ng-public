import { Injectable } from '@angular/core';
import { Position } from '../../models/position.model';
import { Info } from '../../models/info.model';
import { ReplaySubject, Observable, Subject, BehaviorSubject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerateMatrixService {

  private weightConstant = '';
  private matrixInitialized = false;

  private info$ = new BehaviorSubject<Info>(null);
  private matrix = new Array(10).fill('').map(() => new Array(10).fill(''));

  constructor() { }

  public getInfo(): Observable<Info> {
    this.generateInfo();
    return this.info$.asObservable();
  }

  public sendInfo(info: Info): void {
    this.info$.next(info);
  }

  public setWeightConstant(character: string): void {
    this.weightConstant = character;
  }

  private generateInfo(): void {
    if (this.matrixInitialized) { return; }
    this.matrixInitialized = true;
    this.fillMatrix();
  }

  private fillMatrix(): void {
    this.matrix = this.matrix.map(row => row.map(cell => cell = this.getRandomCharacter()));

    if (this.weightConstant) {
      this.fillWeightConstant(this.weightConstant);
      this.weightConstant = '';
    }
    const info = { code: this.generateCode(), matrix: this.matrix };
    this.sendInfo(info);

    timer(2000).subscribe(() => {
      this.fillMatrix();
    });
  }

  private generateCode(): string {
    const seconds = new Date().getSeconds();
    const position = this.getPositionFromNumber(seconds);
    const characterA = this.matrix[position.a][position.b];
    const characterB = this.matrix[position.b][position.a];
    const code = this.getCodeByOccurrences(this.getNOccurrences(characterA), this.getNOccurrences(characterB));
    return code;
  }

  private fillWeightConstant(weightConstant: string): void {
    const uniqueRandomNumbersArray = this.getRandomPositions(20);
    uniqueRandomNumbersArray.forEach(randomPosition => {
      this.matrix[randomPosition.a][randomPosition.b] = weightConstant.toLocaleLowerCase();
    });
  }

  private getRandomCharacter(): string {
    const randomAsciiDecimal = Math.floor(Math.random() * 26 + 97);
    const character = String.fromCharCode(randomAsciiDecimal);
    return character;
  }

  private getRandomPositions(nToReturn: number): Array<Position> {
    const arr = [];
    while (arr.length < nToReturn) {
      const r = Math.floor(Math.random() * 100);
      if (arr.indexOf(r) === -1) {
        arr.push(r);
      }
    }
    return arr.map(num => this.getPositionFromNumber(num));
  }

  private getNOccurrences(character: string): number {
    let count = 0;
    this.matrix.forEach((row) => row.forEach(cell => cell === character && count++));
    return count;
  }

  private getPositionFromNumber(num: number): Position {
    const splited = num.toString().split('');
    if (!splited[1]) {
      return { a: '0', b: splited[0] };
    }
    return { a: splited[0], b: splited[1] };
  }

  private getCodeByOccurrences(occurrencesA: number, occurrencesB: number): string {
    const first = this.getLowerIntegerPossible(occurrencesA).toString();
    const second = this.getLowerIntegerPossible(occurrencesB).toString();
    const code = first + second;
    return code;
  }

  private getLowerIntegerPossible(inNumber: number): number {
    let outNumber: number;
    let divider = 1;

    do {
      outNumber = inNumber / divider;
      divider++;
    } while (outNumber > 9);

    return Math.ceil(outNumber);
  }
}
