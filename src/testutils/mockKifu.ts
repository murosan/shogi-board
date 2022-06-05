import Kifu from '../model/kifu/Kifu'
import { Move } from '../model/kifu/Move'
import { Empty } from '../model/shogi/Piece'
import Point from '../model/shogi/Point'
import { Sente } from '../model/shogi/Turn'

export function mockKifu(): Kifu {
  return {
    meta: {
      version: '1',
      player: { sente: '', gote: '' },
      handicap: '平手',
    },
    history: {
      moves: [
        mockMove('mock0', 0),
        mockMove('mock1', 1),
        mockMove('mock2', 2),
        {
          branches: [
            {
              moves: [mockMove('mock_0', 3), mockMove('mock_1', 4)],
              index: 0,
            },
            {
              moves: [
                mockMove('mock3', 3),
                mockMove('mock4', 4),
                mockMove('mock5', 5),
              ],
              index: 2,
            },
            {
              moves: [
                mockMove('mock_2', 3),
                mockMove('mock_3', 4),
                mockMove('mock_4', 5),
              ],
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

// 分岐で先頭しかないやつ
export function mockKifu2(): Kifu {
  return {
    meta: {
      version: '1',
      player: { sente: '', gote: '' },
      handicap: '平手',
    },
    history: {
      moves: [
        mockMove('mock0', 0),
        mockMove('mock1', 1),
        mockMove('mock2', 2),
        {
          branches: [
            {
              moves: [mockMove('mock_0', 3), mockMove('mock_1', 4)],
              index: 0,
            },
            {
              moves: [mockMove('mock3', 3)],
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

export function mockMove(str: string, index: number): Move {
  const mockPoint: Point = { row: 0, column: 0 }
  return {
    index,
    str,
    source: mockPoint,
    dest: mockPoint,
    piece: Empty,
    pos: { pos: [], cap0: [], cap1: [], turn: Sente, moveCount: 1 },
  }
}
