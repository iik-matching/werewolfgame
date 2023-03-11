import {IYakushoku} from './interface';

//プレイヤークラス
export class PlayerClass {
  private yakushoku: IYakushoku;
  private name: string;
  private count: number = 0;
  private isDeath: boolean = false;
  private uranaiFlag: boolean = false;
  private kishiFlag: boolean = false;
  private shuugekiFlag: boolean = false;
  private publicResultFlag: boolean = false;

  constructor(name: string, yakushoku: IYakushoku) {
    this.name = name;
    this.yakushoku = yakushoku;
  }

  getYakushoku() {
    return this.yakushoku;
  }

  getZinnei(): string {
    return this.yakushoku.getZinnei();
  }

  getName() {
    return this.name;
  }

  getCount() {
    return this.count;
  }

  getIsDeath() {
    return this.isDeath;
  }

  getUranaiFrag() {
    return this.uranaiFlag;
  }

  getKishiFlag() {
    return this.kishiFlag;
  }

  getShuugekiFlag() {
    return this.shuugekiFlag;
  }
  getPublicResultFlg() {
    return this.publicResultFlag;
  }

  countUp() {
    this.count++;
  }

  countInitialize() {
    this.count = 0;
    this.uranaiFlag = false;
    this.kishiFlag = false;
    this.shuugekiFlag = false;
  }

  changeIsDeath(flag: boolean) {
    this.isDeath = flag;
  }

  changeUranaiFlag(flag: boolean) {
    this.uranaiFlag = flag;
  }

  changeKishiFrag(flag: boolean) {
    this.kishiFlag = flag;
  }

  changeShuugekiFlag(flag: boolean) {
    this.shuugekiFlag = flag;
  }

  changePublicResultFlag(flag: boolean) {
    this.publicResultFlag = flag;
  }
}
