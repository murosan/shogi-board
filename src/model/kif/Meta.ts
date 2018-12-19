import Position from '../shogi/Position'

export default interface Meta {
  // 棋譜のバージョン
  version: string

  date: {
    // 開始日時
    start: Date
    // 終了日時
    end: Date
  }

  // 表題とか棋戦名とか
  title: string

  // 対局場所
  place: string

  // 対局者
  player: {
    sente: string
    gote: string
  }

  time?: {
    // 先手の持ち時間
    init0?: number
    // 後手の持ち時間
    init1?: number

    // 先手の消費時間
    total0?: number

    // 後手の消費時間
    total1?: number
  }

  // 手合割
  // TODO: あとで type 定義作る
  handicap: string

  // 初期局面の情報
  pos: Position
}
