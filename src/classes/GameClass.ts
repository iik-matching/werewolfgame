import {PlayerClass} from './PlayerClass';
import {GameConst, YakushokuConst} from '../const';

//ゲームクラス
export class GameClass {
  //プレイヤー
  public players: PlayerClass[] = [];

  //今プレイしているプレイヤーのインデックス
  private nowIndex: number = 0;

  //朝死んだ人
  public asa_dethplayer: string = '';

  //夜死んだ人
  public yoru_dethplayer: string = 'いません';

  //ゲーム判定フラグ(0:初期値(ゲーム再開）、1:人狼勝利、2:市民勝利)
  public gameendflag: string = '0';

  //アクション済みのプレイヤー人数
  public DidActionCount: number = 0;

  //決選投票判定フラグ
  private FinalVoteFlg: boolean = false;

  //決選投票対象プレイヤーの配列
  public FinalVoteTargetPlayers: PlayerClass[] = [];

  //朝か夜
  public AsaOrYoru: string = GameConst.YORU;

  public canActionPlayerCount: number = 0;

  //コンストラクタ
  constructor(players: PlayerClass[]) {
    this.players = players;
    this.canActionPlayerCount = this.players.length;
  }

  // 単純に次のインデックスを教えてくれる関数
  private getNextIndex(index: number) {
    let nextIndex: number = index + 1;
    if (nextIndex == this.players.length) {
      nextIndex = 0;
    }
    return nextIndex;
  }

  // 次のプレイヤーのインデックスをセットする
  nextPlayer(): void {
    let checkIndex: number = this.getNextIndex(this.nowIndex);
    for (;;) {
      // 決選投票の場合
      if (this.FinalVoteFlg) {
        if (this.players[checkIndex].getIsDeath() == false) {
          if (!this.FinalVoteTargetPlayers.includes(this.players[checkIndex])) {
            // この人を次指名する。
            this.nowIndex = checkIndex;
            break;
          }
        }
      } else {
        if (
          this.players[checkIndex].getIsDeath() == false ||
          this.players[checkIndex].getPublicResultFlg()
        ) {
          // この人を次指名する。
          this.nowIndex = checkIndex;
          break;
        }
      }

      checkIndex = this.getNextIndex(checkIndex);
    }
  }

  getNowPlayer() {
    return this.players[this.nowIndex];
  }

  // 占い結果を取得する関数
  gatUranaiResult(): string {
    let uranaiResult: string = '';
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].getUranaiFrag() == true) {
        if (this.players[i].getZinnei() == YakushokuConst.ZINROU) {
          uranaiResult = '人狼です。';
        } else {
          uranaiResult = '人狼ではありません。';
        }
      }
    }
    return uranaiResult;
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

  decrementCanAction() {
    this.canActionPlayerCount--;
  }

  //全てのプレイヤーがアクション済みかの判定
  compareDidActionCountToPlayersCount(): boolean {
    if (this.FinalVoteFlg) {
      return (
        this.DidActionCount >=
        this.canActionPlayerCount - this.FinalVoteTargetPlayers.length
      );
    } else {
      return this.DidActionCount >= this.canActionPlayerCount;
    }
  }

  changeFinalVoteFlag(flag: boolean) {
    this.FinalVoteFlg = flag;
  }

  getFinalVoteFlag() {
    return this.FinalVoteFlg;
  }

  //朝のアクション
  asa(tName: string) {
    if (!this.getNowPlayer().getIsDeath()) {
      this.getNowPlayer().getYakushoku().vote(this.players, tName);
    }
  }

  //夜のアクション
  yoru(tName: string) {
    if (!this.getNowPlayer().getIsDeath()) {
      this.getNowPlayer().getYakushoku().action(this.players, tName);
    }
  }

  //集計
  shukei() {
    // 夜の場合
    if (this.AsaOrYoru == GameConst.YORU) {
      /// ---襲撃を確定させる---
      console.log('---襲撃予定を確定させます---');
      // 最大数を計算
      let max: number = 0;
      for (var i = 0; i < this.players.length; i++) {
        if (this.players[i].getZinnei() != GameConst.ZINROUSHOURI) {
          if (max < this.players[i].getShuugekiCount()) {
            max = this.players[i].getShuugekiCount();
          }
        }
      }
      console.log('最大数は', max);

      // 処刑台にあげる
      var shokeidai: number[] = [];
      for (var i = 0; i < this.players.length; i++) {
        if (this.players[i].getZinnei() != GameConst.ZINROUSHOURI) {
          if (max == this.players[i].getShuugekiCount()) {
            shokeidai.push(i);
          }
        }
      }
      //シャッフル
      const shuffle = ([...array]) => {
        for (let i = array.length - 1; i >= 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };
      shokeidai = shuffle(shokeidai);
      let shokeiIndex: number = shokeidai[0];
      // 襲撃する
      this.players[shokeiIndex].doneShuugeki();
      console.log(this.players[shokeiIndex].getName(), 'を襲撃予定です。');
      console.log('------');
      /// ------

      //人狼が襲撃に成功したかどうか
      for (var i = 0; i < this.players.length; i++) {
        //人狼に襲撃された場合
        if (this.players[i].getIsShuugekiFrag()) {
          //騎士に守られなかった場合
          if (this.players[i].getKishiFlag() == false) {
            console.log(`${this.players[i].getName()}が襲撃されました。`);
            this.players[i].changeIsDeath(true);
            this.players[i].changePublicResultFlag(true);
            this.yoru_dethplayer = this.players[i].getName();
          } else {
            console.log(`${this.players[i].getName()}を騎士が守りました。`);
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
    } else if (this.AsaOrYoru == GameConst.ASA) {
      //最大カウントの人を全て抽出
      var tIndexs: number[] = [];
      var maxCount: number = 0;
      //決選投票か通常投票か
      if (this.FinalVoteFlg) {
        //決選投票の場合
        for (var i = 0; i < this.FinalVoteTargetPlayers.length; i++) {
          if (this.FinalVoteTargetPlayers[i].getCount() > maxCount) {
            maxCount = this.FinalVoteTargetPlayers[i].getCount();
          }
        }
        for (var i = 0; i < this.players.length; i++) {
          if (this.players[i].getCount() == maxCount) {
            tIndexs.push(i);
          }
        }
      } else {
        //通常投票の場合
        for (var i = 0; i < this.players.length; i++) {
          if (this.players[i].getCount() > maxCount) {
            maxCount = this.players[i].getCount();
          }
        }
        for (var i = 0; i < this.players.length; i++) {
          if (this.players[i].getCount() == maxCount) {
            if (this.AsaOrYoru == GameConst.ASA) {
              tIndexs.push(i);
              this.FinalVoteTargetPlayers.push(this.players[i]);
            } else {
              console.log(`${this.players[i].getName()}は怪しまれています。`);
            }
          }
        }
      }

      for (var i = 0; i < this.players.length; i++) {
        console.log(
          `${this.players[i].getName()}さん: ${this.players[i].getCount()}票`,
        );
      }
      if (this.getFinalVoteFlag()) {
        //1人の場合
        if (tIndexs.length <= 1) {
          //死刑執行
          this.players[tIndexs[0]].changeIsDeath(true);
          this.players[tIndexs[0]].changePublicResultFlag(true);
          console.log(
            '決選投票の結果、' +
              this.players[tIndexs[0]].getName() +
              'を処刑しました。',
          );
        } else {
          // 投票対象のプレイヤーをランダムに処刑
          const shuffle = ([...array]) => {
            for (let i = array.length - 1; i >= 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
          };
          this.FinalVoteTargetPlayers = shuffle(this.FinalVoteTargetPlayers);
          this.FinalVoteTargetPlayers[0].changeIsDeath(true);
          this.FinalVoteTargetPlayers[0].changePublicResultFlag(true);
          console.log(
            '決選投票でも決まらなかった為、ランダムに選択した結果' +
              this.FinalVoteTargetPlayers[0].getName() +
              'を処刑しました。',
          );
        }
        this.asa_dethplayer = this.FinalVoteTargetPlayers[0].getName();
        this.changeFinalVoteFlag(false);
      } else {
        //1人の場合
        if (tIndexs.length <= 1) {
          //死刑執行
          this.players[tIndexs[0]].changeIsDeath(true);
          this.players[tIndexs[0]].changePublicResultFlag(true);
          console.log(this.players[tIndexs[0]].getName() + 'を処刑しました。');
          this.asa_dethplayer = this.players[tIndexs[0]].getName();
        } else {
          //複数人の場合　決選投票へ
          this.changeFinalVoteFlag(true);
        }
      }
    }

    if (!this.getFinalVoteFlag()) {
      //判定処理
      this.hantei();
    }

    //アクション済みのアカウント数
    this.DidActionCount = 0;

    // プレイヤーの初期化処理
    for (var i = 0; i < this.players.length; i++) {
      this.players[i].countInitialize();
    }

    this.FinalVoteTargetPlayers = [];
  }

  //判定
  hantei(): string {
    console.log('---判定処理---');
    //人狼陣営人数変数
    let zinrou_num: number = 0;
    //市民陣営人数変数
    let simin_num: number = 0;

    for (var i = 0; i < this.players.length; i++) {
      //生存している人の中で陣営人数をカウント
      if (this.players[i].getIsDeath() == false) {
        if (this.players[i].getZinnei() == '人狼') {
          zinrou_num += 1;
        } else {
          simin_num += 1;
        }
      }
    }
    console.log(`市民の数：${simin_num} 人狼の数${zinrou_num}`);

    if (zinrou_num >= simin_num) {
      //人狼陣営が市民陣営以上であれば、ゲーム終了
      console.log('人狼の勝利！！ゲーム終了');
      this.gameendflag = '1';
    } else if (zinrou_num == 0) {
      //人狼が０人であれば、ゲーム終了
      console.log('市民勝利！！ゲーム終了');
      this.gameendflag = '2';
    } else {
      //市民が人狼より多い場合引き続きゲーム再開
      console.log('引き続きゲームは続きます。');
      this.gameendflag = '0';
    }
    console.log('------');
    return this.gameendflag;
  }
}
