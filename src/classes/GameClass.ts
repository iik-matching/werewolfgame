import {PlayerClass} from './PlayerClass';
import {GameConst} from '../const';

//ゲームクラス
export class GameClass {
  //プレイヤー
  public players: PlayerClass[] = [];

  //今プレイしているプレイヤーのインデックス
  public nowIndex: number = 0;

  public testStr: string = 'test1';

  //朝死んだ人
  public asa_dethplayer: string = '';
  //夜死んだ人
  public yoru_dethplayer: string = 'いません';

  //ゲーム判定フラグ(0:初期値(ゲーム再開）、1:人狼勝利、2:市民勝利)
  public gameendflag: string = '0';

  //人狼陣営人数変数
  private zinrou_num: number = 0;
  //市民陣営人数変数
  private simin_num: number = 0;

  //アクション済みのプレイヤー人数
  public DidActionCount: number = 0;
  //朝か夜
  public AsaOrYoru: string = GameConst.ASA;

  public alivePlayerCount: number = 0;

  //コンストラクタ
  constructor(players: PlayerClass[]) {
    this.players = players;
    this.alivePlayerCount = this.players.length;
  }

  //プレイヤー追加
  addPlayer(player: PlayerClass): void {
    this.players.push(player);
  }

  //アクション済みの人数をカウントする
  didActionCount() {
    this.DidActionCount++;
  }

  //アクション済みの人数を取得する
  getDidActionCount() {
    return this.DidActionCount;
  }

  //全てのプレイヤーがアクション済みかの判定
  compareDidActionCountToPlayersCount(): boolean {
    console.log('DidActionCount', this.DidActionCount);
    console.log('alivePlayerCount', this.alivePlayerCount);
    return this.DidActionCount >= this.alivePlayerCount;
  }

  //朝のアクション
  asa(tName: string) {
    if (!this.players[this.nowIndex].getIsDeath()) {
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
      this.players[tIndexs[0]].changePublicResultFlag(true);
      this.alivePlayerCount--;
      console.log(this.players[tIndexs[0]].getName() + 'を処刑しました。');
      this.asa_dethplayer = this.players[tIndexs[0]].getName();
    }

    //複数人の場合　決選投票へ

    //判定処理
    this.hantei();

    //インデックス初期化
    this.nowIndex = 0;
    this.DidActionCount = 0;

    //投票数の初期化
    for (var i = 0; i < this.players.length; i++) {
      this.players[i].countInitialize();
    }

    //アクション済みのアカウント数
    this.DidActionCount = 0;
  }

  yoru_shuukei() {
    //人狼が襲撃に成功したかどうか
    for (var i = 0; i < this.players.length; i++) {
      //人狼に襲撃された場合
      if (this.players[i].getShuugekiFlag() == true) {
        console.log(`${this.players[i].getName()}が襲撃されました。`);
        //騎士に守られなかった場合
        if (this.players[i].getKishiFlag() == false) {
          console.log('騎士が外しました。');
          this.players[i].changeIsDeath(true);
          this.yoru_dethplayer = this.players[i].getName();
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

    //判定処理
    this.hantei();

    //インデックス初期化
    this.nowIndex = 0;

    //投票数の初期化
    for (var i = 0; i < this.players.length; i++) {
      this.players[i].countInitialize();
    }

    //アクション済みのアカウント数
    this.DidActionCount = 0;
  }

  //判定
  hantei(): string {
    //人狼陣営人数変数
    var zinrou_num: number = 0;
    //市民陣営人数変数
    var simin_num: number = 0;

    for (var i = 0; i < this.players.length; i++) {
      console.log(this.players[i].getZinnei(), this.players[i].getIsDeath());
      //生存している人の中で陣営人数をカウント
      if (this.players[i].getIsDeath() == false) {
        if (this.players[i].getZinnei() == '人狼') {
          zinrou_num += 1;
        } else {
          simin_num += 1;
        }
      }
    }

    console.log('人狼陣営人数' + zinrou_num);
    console.log('市民陣営人数' + simin_num);

    //人狼陣営が市民陣営以上であれば、ゲーム終了
    if (zinrou_num >= simin_num) {
      console.log('人狼の勝利！！ゲーム終了');
      this.gameendflag = '1';
    } else if (zinrou_num == 0) {
      ////人狼が０人であれば、ゲーム終了
      console.log('市民勝利！！ゲーム終了');
      this.gameendflag = '2';
    } else {
      ////市民が人狼より多い場合引き続きゲーム再開
      console.log('引き続きゲームは続きます。');
      this.gameendflag = '0';
    }

    zinrou_num = 0;
    simin_num = 0;

    return this.gameendflag;
  }
}
