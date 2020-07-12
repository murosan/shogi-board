import { Position } from '../shogi/Position'
import { hirate } from '../shogi/PositionInit'
import History from './History'
import Meta from './Meta'

export default interface Kif {
  // 対局者などの対局情報
  meta: Meta

  // 棋譜
  history: History
}

export function newKif(): Kif {
  const initPos: Position = hirate()
  return {
    meta: {
      version: '1',
      player: { sente: '', gote: '' },
      handicap: '平手',
      initPos,
    },
    history: {
      // TODO: 持ち方考える
      moves: [
        {
          index: 0,
          str: '開始局面',
          pos: initPos,
          source: { row: -1, column: -1 }, // 盤上に存在しない場所にしておく
          dest: { row: -1, column: -1 },
          piece: 0,
        },
      ],
      index: 0,
    },
  }
}
