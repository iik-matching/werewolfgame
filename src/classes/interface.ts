import {PlayerClass} from './PlayerClass';

//役職インターフェース
export interface IYakushoku {
  //役職名を取得する
  getName(): string;

  vote(players: PlayerClass[], tName: string): void;

  action(players: PlayerClass[], tName: string): void;
}
