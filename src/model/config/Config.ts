export interface Config {
  // 選択された駒が移動できる場所を着色するか
  paintTargets: boolean

  setPaintTargets(b: boolean): Promise<void>

  // shogi-board-server 用の設定
  serverURL: string

  setServerURL(s: string): Promise<void>

  // cookie に保存するか
  saveToCookie: boolean

  setSaveToCookie(b: boolean): Promise<void>
}
