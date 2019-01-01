import Kif from '../model/kif/Kif'
import Move from '../model/kif/Move'
import { Empty } from '../model/shogi/Piece'
import Point from '../model/shogi/Point'
import Position from '../model/shogi/Position'
import { hirate } from '../model/shogi/PositionInit'
import { Sente } from '../model/shogi/Turn'

export function mockKif(): Kif {
  const mockPos: Position = hirate()
  return {
    meta: {
      version: '1',
      player: { sente: '', gote: '' },
      handicap: '平手',
      initPos: mockPos,
    },
    history: {
      moves: [
        mockMove('mock0'),
        mockMove('mock1'),
        mockMove('mock2'),
        {
          branches: [
            {
              moves: [mockMove('mock_0'), mockMove('mock_1')],
              index: 0,
            },
            {
              moves: [mockMove('mock3'), mockMove('mock4'), mockMove('mock5')],
              index: 2,
            },
            {
              moves: [
                mockMove('mock_2'),
                mockMove('mock_3'),
                mockMove('mock_4'),
              ],
              index: 2,
            },
          ],
          index: 1,
        },
      ],
      index: 3,
    },
  }
}

// 分岐で先頭しかないやつ
export function mockKif2(): Kif {
  const mockPos: Position = hirate()
  return {
    meta: {
      version: '1',
      player: { sente: '', gote: '' },
      handicap: '平手',
      initPos: mockPos,
    },
    history: {
      moves: [
        mockMove('mock0'),
        mockMove('mock1'),
        mockMove('mock2'),
        {
          branches: [
            {
              moves: [mockMove('mock_0'), mockMove('mock_1')],
              index: 0,
            },
            {
              moves: [mockMove('mock3')],
              index: 0,
            },
          ],
          index: 1,
        },
      ],
      index: 3,
    },
  }
}

export function mockMove(str: string): Move {
  const mockPoint: Point = { row: 0, column: 0 }
  return {
    str,
    source: mockPoint,
    dest: mockPoint,
    piece: Empty,
    pos: { pos: [], cap0: [], cap1: [], turn: Sente, moveCount: 1 },
  }
}
