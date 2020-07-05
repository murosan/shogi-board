export interface Config {
  // 選択された駒が移動できる場所を着色するか
  paintTargets: boolean

  setPaintTargets(b: boolean): Promise<void>

  // shogi-board-server 用の設定
  serverURL: string

  setServerURL(s: string): Promise<void>

  // localStorage に保存するか
  saveToLocalStorage: boolean

  setSaveToLocalStorage(b: boolean): Promise<void>
}
