export interface Config {
  // 選択された駒が移動できる場所を着色するか
  paintTargets: boolean

  setPaintTargets(b: boolean): Promise<void>

  // shogi-board-server 用の設定
  serverURL: string

  setServerURL(s: string): Promise<void>

  // ボードエリアの幅
  boardWidth: {
    save: boolean // localStorage に保存するかどうか
    width: number | null // ボードエリアの幅(px)。幅が null の場合は 100% が適用される
  }

  setSaveBoardWidth(b: boolean): Promise<void>
  setBoardWidth(v: number | null): Promise<void>

  // localStorageに棋譜を保存し、リロードしても棋譜が保持されるようにするか
  saveKifuToLocalStorage: boolean

  setSaveKifuToLocalStorage(b: boolean): Promise<void>
}
