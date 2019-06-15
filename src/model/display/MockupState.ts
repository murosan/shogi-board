// モックアップの表示をコントロールするための情報
export type MockupState = number

// 非表示
export const MockupHidden: MockupState = 1

// 将棋エンジンとの接続を制御したりする画面
export const MockupEngineControl: MockupState = 2

// shogi-board-server の URL が設定されていないとき
// 将棋エンジンに接続するボタンが押されたときに出す画面
export const MockupServerSetting: MockupState = 3

// 設定画面
export const MockupSetting: MockupState = 4
