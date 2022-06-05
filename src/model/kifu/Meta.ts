export const Versions = {
  latest: '1',
  1: '1',
}

export default interface Meta {
  // 棋譜のバージョン
  version: string

  date?: {
    // 開始日時
    start?: Date
    // 終了日時
    end?: Date
  }

  // 表題とか棋戦名とか
  title?: string

  // 対局場所
  place?: string

  // 対局者
  player: {
    sente: string
    gote: string
  }

  time?: {
    // 先手の持ち時間(秒)
    sente: number
    // 後手の持ち時間(秒)
    gote: number
  }

  // 手合割
  handicap: string

  // その他の情報
  other?: Map<string, string>
}
