import Position from '../shogi/Position'
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
          str: '開始局面',
          pos: initPos,
          source: { row: 0, column: 0 },
          dest: { row: 0, column: 0 },
          piece: 0,
        },
      ],
      index: 0,
    },
  }
}
