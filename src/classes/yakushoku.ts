import {
  ActionTextConst,
  ExtentionMessageConst,
  YakushokuConst,
  YoruActionMessageConst,
  ZinneiConst,
} from '../const';
import {IYakushoku} from './interface';
import {PlayerClass} from './PlayerClass';

abstract class YakushokuBaseClass implements IYakushoku {
  name: string;
  //陣営
  zinnei: string;
  //アクションテキスト
  actionText: string;
  //夜のアクションの確認メッセージ
  yoruActionMessage: string;
  //アクションの説明文
  extentionMessage: string;

  constructor() {
    this.name = '';
    this.zinnei = '';
    this.actionText = '';
    this.yoruActionMessage = '';
    this.extentionMessage = '';
  }

  //朝のアクション
  vote(players: PlayerClass[], tName: string): void {
    for (var i = 0; i < players.length; i++) {
      //ターゲットの名前の場合
      if (players[i].getName() == tName) {
        //カウントアップ
        players[i].countUp();
        break;
      }
    }
  }

  action(players: PlayerClass[], tName: string): void {}

  getName(): string {
    return this.name;
  }

  getZinnei(): string {
    return this.zinnei;
  }
}

export class ShiminClass extends YakushokuBaseClass {
  constructor() {
    super();
    this.name = YakushokuConst.SIMIN;
    this.zinnei = ZinneiConst.Murabito;
    this.actionText = ActionTextConst.SIMIN;
    this.yoruActionMessage = YoruActionMessageConst.SIMIN;
    this.extentionMessage = ExtentionMessageConst.SIMIN;
  }

  override action(players: PlayerClass[], tName: string): void {
    this.vote(players, tName);
  }
}

export class JinrouClass extends YakushokuBaseClass {
  constructor() {
    super();
    this.name = YakushokuConst.ZINROU;
    this.zinnei = ZinneiConst.ZINROU;
    this.actionText = ActionTextConst.ZINROU;
    this.yoruActionMessage = YoruActionMessageConst.ZINROU;
    this.extentionMessage = ExtentionMessageConst.ZINROU;
  }

  override action(players: PlayerClass[], tName: string): void {
    for (var i = 0; i < players.length; i++) {
      //ターゲットの名前の場合
      if (players[i].getName() == tName) {
        //カウントアップ
        players[i].countUpShuugeki();
        break;
      }
    }
  }
}

export class UranaishiClass extends YakushokuBaseClass {
  constructor() {
    super();
    this.name = YakushokuConst.URANAISI;
    this.zinnei = ZinneiConst.Murabito;
    this.actionText = ActionTextConst.URANAISI;
    this.yoruActionMessage = YoruActionMessageConst.URANAISI;
    this.extentionMessage = ExtentionMessageConst.URANAISI;
  }

  override action(players: PlayerClass[], tName: string): void {
    for (var i = 0; i < players.length; i++) {
      //ターゲットの名前の場合
      if (players[i].getName() == tName) {
        //カウントアップ
        players[i].changeUranaiFlag(true);
        break;
      }
    }
  }
}

export class KishiClass extends YakushokuBaseClass {
  constructor() {
    super();
    this.name = YakushokuConst.KISHI;
    this.zinnei = ZinneiConst.Murabito;
    this.actionText = ActionTextConst.KISHI;
    this.yoruActionMessage = YoruActionMessageConst.KISHI;
    this.extentionMessage = ExtentionMessageConst.KISHI;
  }

  override action(players: PlayerClass[], tName: string): void {
    for (var i = 0; i < players.length; i++) {
      //ターゲットの名前の場合
      if (players[i].getName() == tName) {
        //カウントアップ
        players[i].changeKishiFrag(true);
        break;
      }
    }
  }
}
