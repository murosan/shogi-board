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

  // ボードエリアの幅を localStorage に保存するか
  saveBoardWidth: boolean

  setSaveBoardWidth(b: boolean): Promise<void>

  // ボードエリアの幅 px で指定される
  // null の場合は 100% が適用される
  appWidth: number | null

  setAppWidth(w?: number): Promise<void>

  // localStorageに棋譜を保存し、リロードしても棋譜が保持されるようにするか
  storeKifu: boolean

  setStoreKifu(b: boolean): Promise<void>
}
