import {PlayerClass} from './PlayerClass';

//役職インターフェース
export interface IYakushoku {
  //役職名を取得する
  getName(): string;

  //投票する
  vote(players: PlayerClass[], tName: string): void;

  //それぞれのアクション
  action(players: PlayerClass[], tName: string): void;

  //陣営を取得する
  getZinnei(): string;
}
