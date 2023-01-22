import {PlayerClass} from './PlayerClass';

//ゲームクラス
export class GameClass {
  //プレイヤー
  private players: PlayerClass[] = [];

  //今プレイしているプレイヤーのインデックス
  private nowIndex: number = 0;

  public testStr: string = 'test1';

  //人狼陣営人数変数
  private zinrou_num: number = 0;
  //市民陣営人数変数
  private simin_num: number = 0;

  //コンストラクタ
  constructor(players: PlayerClass[]) {
    this.players = players;
  }

  //プレイヤー追加
  addPlayer(player: PlayerClass): void {
    this.players.push(player);
  }

  //朝のアクション
  asa(tName: string) {
    if (!this.players[this.nowIndex].getIsDeath()) {
      console.log('isDeath', this.players[this.nowIndex].getIsDeath());
      this.players[this.nowIndex].getYakushoku().vote(this.players, tName);
    }
    this.nowIndex++;
  }

  //夜のアクション
  yoru(tName: string) {
    if (!this.players[this.nowIndex].getIsDeath()) {
      this.players[this.nowIndex].getYakushoku().action(this.players, tName);
    }
    this.nowIndex++;
  }

  //集計
  shukei() {
    //最大カウントを調べる
    var maxCount: number = 0;
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].getCount() >= maxCount) {
        maxCount = this.players[i].getCount();
      }
    }

    //最大カウントの人を全て抽出
    var tIndexs: number[] = [];
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].getCount() == maxCount) {
        tIndexs.push(i);
      }
    }

    for (var i = 0; i < this.players.length; i++) {
      console.log(
        `${this.players[i].getName()}さん: ${this.players[i].getCount()}票`,
      );
    }

    //1人の場合
    if (tIndexs.length == 1) {
      //死刑執行
      this.players[tIndexs[0]].changeIsDeath(true);
      console.log(this.players[tIndexs[0]].getName() + 'を処刑しました。');
    }

    //複数人の場合　決選投票へ

    this.hantei();

    //インデックス初期化
    this.nowIndex = 0;

    //投票数の初期化
    for (var i = 0; i < this.players.length; i++) {
      this.players[i].countInitialize();
    }
  }

  yoru_shuukei() {
    //人狼が襲撃に成功したかどうか
    for (var i = 0; i < this.players.length; i++) {
      //人狼に襲撃された場合
      if (this.players[i].getShuugekiFlag() == true) {
        console.log(`${this.players[i].getName()}が襲撃されました。`);
        //騎士に守られなかった場合
        if (this.players[i].getKishiFlag() == false) {
        } else {
          console.log('騎士が守りました。');
        }
      }

      if (this.players[i].getUranaiFrag() == true) {
        console.log(
          `${this.players[i].getName()}は${this.players[
            i
          ].getZinnei()}陣営です。`,
        );
      }
    }

    //○○さんが怪しまれています。
    var maxCount: number = 0;
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].getCount() >= maxCount) {
        maxCount = this.players[i].getCount();
      }
    }
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].getCount() == maxCount) {
        console.log(`${this.players[i].getName()}は怪しまれています。`);
      }
    }

    this.hantei();

    //インデックス初期化
    this.nowIndex = 0;
  }

  //判定
  private hantei() {
    for (var i = 0; i < this.players.length; i++) {
      console.log(this.players[i].getIsDeath());
      //生存している人の中で陣営人数をカウント
      if (this.players[i].getIsDeath() == false) {
        console.log(this.players[i].getZinnei());
        if (this.players[i].getZinnei() == '人狼') {
          this.zinrou_num += 1;
        } else {
          this.simin_num += 1;
        }
      }
    }

    console.log('人狼陣営人数' + this.zinrou_num);
    console.log('市民陣営人数' + this.simin_num);

    //人狼陣営が市民陣営以上であれば、ゲーム終了
    if (this.zinrou_num >= this.simin_num) {
      console.log('人狼の勝利！！ゲーム終了');
    } else if (this.zinrou_num == 0) {
      ////人狼が０人であれば、ゲーム終了
      console.log('市民勝利！！ゲーム終了');
    } else {
      ////市民が人狼より多い場合引き続きゲーム再開
      console.log('引き続きゲームは続きます。');
    }

    this.zinrou_num = 0;
    this.simin_num = 0;
  }
}
