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
const head: Move = mockMove('mock0', 0)

it('分岐なしの棋譜に新しい一手を追加できる', async () => {
  const kif: Kif = {
    meta: mockMeta,
    history: {
      moves: [head],
      index: 0,
    },
  }
  const shouldPush: Move = mockMove('mock1', 1)
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
  const last: Move = mockMove('mock1', 1)
  const kif: Kif = {
    meta: mockMeta,
    history: {
      moves: [head, last],
      index: 0,
    },
  }
  const shouldPush: Move = mockMove('mock2', 2)
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
  const one: Move = mockMove('mock1', 1)
  const two: Move = mockMove('mock2', 2)
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
  const shouldPush: Move = mockMove('mock3', 3)
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
  const one: Move = mockMove('mock1', 1)
  const two: Move = mockMove('mock2', 2)
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
  const shouldPush: Move = mockMove('mock3', 3)
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

it('追加しようとする Move が次の局面と同じならインデックスを更新するだけ', async () => {
  const zero: Move = mockMove('mock0', 0)
  const one: Move = mockMove('mock1', 1)

  const kif: Kif = {
    meta: mockMeta,
    history: {
      moves: [zero, one],
      index: 0,
    },
  }
  const shouldPush: Move = one
  const expected: Kif = {
    meta: mockMeta,
    history: {
      moves: [head, one],
      index: 1,
    },
  }
  expect(pushMove(kif, shouldPush)).toEqual(expected)
})

it('分岐を経由して追加しようとした Move が次と一緒でもインデックスを更新するだけ', async () => {
  const zero: Move = mockMove('mock0', 0)
  const one: Move = mockMove('mock1', 1)
  const kif: Kif = {
    meta: mockMeta,
    history: {
      moves: [
        zero,
        {
          branches: [
            { moves: [zero, one], index: 0 }, // 0 なので one を追加するとここが変わるだけ
            { moves: [one], index: 0 },
          ],
          index: 0,
        },
      ],
      index: 1,
    },
  }
  const expected: Kif = {
    meta: mockMeta,
    history: {
      moves: [
        zero,
        {
          branches: [
            { moves: [zero, one], index: 1 },
            { moves: [one], index: 0 },
          ],
          index: 0,
        },
      ],
      index: 1,
    },
  }
  expect(pushMove(kif, one)).toEqual(expected)
})

it('追加しようとした Move が次の分岐の先頭でもインデックスが更新されるだけ', async () => {
  const zero: Move = mockMove('mock0', 0)
  const one: Move = mockMove('mock1', 1)
  const kif: Kif = {
    meta: mockMeta,
    history: {
      moves: [
        zero,
        {
          branches: [
            { moves: [zero, one], index: 0 },
            { moves: [one], index: 0 },
          ],
          index: 0,
        },
      ],
      index: 0, // ここは変わるはず
    },
  }
  const expected: Kif = {
    meta: mockMeta,
    history: {
      moves: [
        zero,
        {
          branches: [
            { moves: [zero, one], index: 0 },
            { moves: [one], index: 0 },
          ],
          index: 0,
        },
      ],
      index: 1,
    },
  }
  expect(pushMove(kif, zero)).toEqual(expected)
})

it('追加しようとした Move が次の分岐のその先でもインデックスが更新されるだけ', async () => {
  const zero: Move = mockMove('mock0', 0)
  const one: Move = mockMove('mock1', 1)
  const two: Move = mockMove('mock2', 2)
  const three: Move = mockMove('mock3', 3)
  const kif: Kif = {
    meta: mockMeta,
    history: {
      moves: [
        zero,
        {
          branches: [
            { moves: [zero, one, two, three], index: 1 }, // ここは変わるはず
            { moves: [one], index: 0 },
          ],
          index: 0,
        },
      ],
      index: 1,
    },
  }
  const expected: Kif = {
    meta: mockMeta,
    history: {
      moves: [
        zero,
        {
          branches: [
            { moves: [zero, one, two, three], index: 2 },
            { moves: [one], index: 0 },
          ],
          index: 0,
        },
      ],
      index: 1,
    },
  }
  expect(pushMove(kif, two)).toEqual(expected)
})
