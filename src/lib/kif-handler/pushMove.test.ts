import Kif from '../../model/kif/Kif'
import Meta from '../../model/kif/Meta'
import Move from '../../model/kif/Move'
import Position from '../../model/shogi/Position'
import { Sente } from '../../model/shogi/Turn'
import { mockMove } from '../../testutils/mockKif'
import pushMove from './pushMove'

const mockPos: Position = {
  pos: [],
  cap0: [],
  cap1: [],
  turn: Sente,
  moveCount: 0,
}
const mockMeta: Meta = {
  version: '1',
  player: { sente: '', gote: '' },
  handicap: '平手',
  initPos: mockPos,
}
const head: Move = mockMove('mock0')
it('分岐なしの棋譜に新しい一手を追加できる', async () => {
  const kif: Kif = {
    meta: mockMeta,
    history: {
      moves: [head],
      index: 0,
    },
  }
  const shouldPush: Move = mockMove('mock1')
  const expected: Kif = {
    meta: mockMeta,
    history: {
      moves: [head, shouldPush],
      index: 1,
    },
  }
  expect(pushMove(kif, shouldPush)).toEqual(expected)
})

it('分岐なしの棋譜の途中に追加したら分岐が作成される', async () => {
  const last: Move = mockMove('mock1')
  const kif: Kif = {
    meta: mockMeta,
    history: {
      moves: [head, last],
      index: 0,
    },
  }
  const shouldPush: Move = mockMove('mock2')
  const expected: Kif = {
    meta: mockMeta,
    history: {
      moves: [
        head,
        {
          branches: [
            { moves: [last], index: 0 },
            { moves: [shouldPush], index: 0 },
          ],
          index: 1,
        },
      ],
      index: 1,
    },
  }
  expect(pushMove(kif, shouldPush)).toEqual(expected)
})

it('分岐を増やせる', async () => {
  const one: Move = mockMove('mock1')
  const two: Move = mockMove('mock2')
  const kif: Kif = {
    meta: mockMeta,
    history: {
      moves: [
        head,
        {
          branches: [{ moves: [one], index: 0 }, { moves: [two], index: 0 }],
          index: 1,
        },
      ],
      index: 0, // head を表示しているので、分岐が増えるはず
    },
  }
  const shouldPush: Move = mockMove('mock3')
  const expected: Kif = {
    meta: mockMeta,
    history: {
      moves: [
        head,
        {
          branches: [
            { moves: [one], index: 0 },
            { moves: [two], index: 0 },
            { moves: [shouldPush], index: 0 },
          ],
          index: 2,
        },
      ],
      index: 1,
    },
  }
  expect(pushMove(kif, shouldPush)).toEqual(expected)
})

it('分岐を経由して、表示局面の末尾に追加できる', async () => {
  const one: Move = mockMove('mock1')
  const two: Move = mockMove('mock2')
  const kif: Kif = {
    meta: mockMeta,
    history: {
      moves: [
        head,
        {
          branches: [{ moves: [one], index: 0 }, { moves: [two], index: 0 }],
          index: 1,
        },
      ],
      index: 1, // 分岐を表示しているので、分岐の末尾が増えるはず
    },
  }
  const shouldPush: Move = mockMove('mock3')
  const expected: Kif = {
    meta: mockMeta,
    history: {
      moves: [
        head,
        {
          branches: [
            { moves: [one], index: 0 },
            { moves: [two, shouldPush], index: 1 },
          ],
          index: 1,
        },
      ],
      index: 1,
    },
  }
  expect(pushMove(kif, shouldPush)).toEqual(expected)
})
