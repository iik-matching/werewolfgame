import {IYakushoku} from './interface';

//プレイヤークラス
export class PlayerClass {
  private yakushoku: IYakushoku;
  private name: string;
  private count: number = 0;
  private isDeath: boolean = false;
  private uranaiFlag: boolean = false;
  private kishiFlag: boolean = false;
  private isShuugekiFrag: boolean = false;
  private shuugekiCount: number = 0;
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

  getIsShuugekiFrag() {
    return this.isShuugekiFrag;
  }

  getUranaiFrag() {
    return this.uranaiFlag;
  }

  getKishiFlag() {
    return this.kishiFlag;
  }

  getShuugekiCount() {
    return this.shuugekiCount;
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
    this.shuugekiCount = 0;
    this.isShuugekiFrag = false;
  }

  changeIsDeath(flag: boolean) {
    this.isDeath = flag;
  }

  doneShuugeki() {
    this.isShuugekiFrag = true;
  }

  changeUranaiFlag(flag: boolean) {
    this.uranaiFlag = flag;
  }

  changeKishiFrag(flag: boolean) {
    this.kishiFlag = flag;
  }

  countUpShuugeki() {
    this.shuugekiCount++;
  }

  changePublicResultFlag(flag: boolean) {
    this.publicResultFlag = flag;
  }
}
