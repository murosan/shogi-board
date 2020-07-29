import { HandicapKinds, positionFromKind } from '../shogi/InitialPositions'
import { Position } from '../shogi/Position'
import History from './History'
import Meta, { Versions } from './Meta'

export default interface Kifu {
  // 対局者などの対局情報
  meta: Meta

  // 棋譜
  history: History
}

export function newKifu(posKind: string = HandicapKinds.hirate): Kifu {
  const initPos: Position = positionFromKind(posKind)
  return {
    meta: {
      version: Versions.latest,
      player: { sente: '', gote: '' },
      handicap: posKind,
    },
    history: {
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
