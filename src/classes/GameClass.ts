import {PlayerClass} from './PlayerClass';

//ゲームクラス
export class GameClass {
  //プレイヤー
  private players: PlayerClass[] = [];

  //今プレイしているプレイヤーのインデックス
  private nowIndex: number = 0;

  public testStr: string = 'test1';

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
    //人狼陣営が市民陣営以上であれば、ゲーム終了
    //人狼が０人であれば、ゲーム終了
  }
}
