//役職インターフェース
export interface IYakushoku {
  //名前
  name: string;
  //陣営
  zinnei: string;
  //アクションテキスト
  actionText: string;
  //夜のアクションの確認メッセージ
  yoruActionMessage: string;
  //アクションの説明文
  extentionMessage: string;

  //朝のアクション　 第２引数　delegate: SelectProtocol　を消している
  action1(name: string): void;
  //夜のアクション
  action2(name: string): void;
  //初夜のアクション
  action3(name: string): void;
}
