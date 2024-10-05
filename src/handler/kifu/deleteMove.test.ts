import Kifu from '../../model/kifu/Kifu'
import Meta from '../../model/kifu/Meta'
import { Move } from '../../model/kifu/Move'
import { mockMove } from '../../testutils/mockKifu'
import deleteMove from './deleteMove'

const mockMeta: Meta = {
  version: '1',
  player: { sente: '', gote: '' },
  handicap: '平手',
}
const head: Move = mockMove('mock0', 0)

it('初期局面は削除できない', async () => {
  const kifu: Kifu = {
    meta: mockMeta,
    history: {
      moves: [head],
      index: 0,
    },
  }
  expect(() => deleteMove(kifu, head)).toThrowError()
})

it('分岐なしの棋譜から削除でき、indexが削除したMoveの直前のMoveになる', async () => {
  const kifu: Kifu = {
    meta: mockMeta,
    history: {
      moves: [
        head,
        mockMove('mock1', 1),
        mockMove('mock2', 2),
        mockMove('mock3', 3),
        mockMove('mock4', 4),
      ],
      index: 4,
    },
  }
  const expected: Kifu = {
    meta: mockMeta,
    history: {
      moves: [head, mockMove('mock1', 1), mockMove('mock2', 2)],
      index: 2, // indexが変更される
    },
  }
  expect(deleteMove(kifu, mockMove('mock3', 3))).toEqual(expected)
})

it('分岐なしの棋譜から削除でき、indexが維持される', async () => {
  const kifu: Kifu = {
    meta: mockMeta,
    history: {
      moves: [
        head,
        mockMove('mock1', 1),
        mockMove('mock2', 2),
        mockMove('mock3', 3),
        mockMove('mock4', 4),
      ],
      index: 1,
    },
  }
  const expected: Kifu = {
    meta: mockMeta,
    history: {
      moves: [head, mockMove('mock1', 1), mockMove('mock2', 2)],
      index: 1, // indexが維持される
    },
  }
  expect(deleteMove(kifu, mockMove('mock3', 3))).toEqual(expected)
})

it('分岐ごと削除できる', async () => {
  const kifu: Kifu = {
    meta: mockMeta,
    history: {
      moves: [
        head,
        mockMove('mock1', 1),
        mockMove('mock2', 2),
        mockMove('mock3', 3),
        {
          branches: [
            { moves: [mockMove('mock4-1', 4)], index: 0 },
            { moves: [mockMove('mock4-2', 4)], index: 0 },
          ],
          index: 1,
        },
      ],
      index: 4,
    },
  }
  const expected: Kifu = {
    meta: mockMeta,
    history: {
      moves: [head, mockMove('mock1', 1), mockMove('mock2', 2)],
      index: 2, // indexが変更される
    },
  }
  expect(deleteMove(kifu, mockMove('mock3', 3))).toEqual(expected)
})

it('分岐を削除できる1', async () => {
  const kifu: Kifu = {
    meta: mockMeta,
    history: {
      moves: [
        head,
        mockMove('mock1', 1),
        mockMove('mock2', 2),
        mockMove('mock3', 3),
        {
          branches: [
            { moves: [mockMove('mock4-1', 4)], index: 0 },
            { moves: [mockMove('mock4-2', 4)], index: 0 },
            { moves: [mockMove('mock4-3', 4)], index: 0 },
          ],
          index: 1,
        },
      ],
      index: 4,
    },
  }
  const expected: Kifu = {
    meta: mockMeta,
    history: {
      moves: [
        head,
        mockMove('mock1', 1),
        mockMove('mock2', 2),
        mockMove('mock3', 3),
        {
          branches: [
            { moves: [mockMove('mock4-1', 4)], index: 0 },
            { moves: [mockMove('mock4-3', 4)], index: 0 },
          ],
          index: 0, // 0になる
        },
      ],
      index: 4,
    },
  }
  expect(deleteMove(kifu, mockMove('mock4-2', 4))).toEqual(expected)
})

it('分岐を削除できる2', async () => {
  const kifu: Kifu = {
    meta: mockMeta,
    history: {
      moves: [
        head,
        mockMove('mock1', 1),
        mockMove('mock2', 2),
        mockMove('mock3', 3),
        {
          branches: [
            { moves: [mockMove('mock4-1', 4)], index: 0 },
            { moves: [mockMove('mock4-2', 4)], index: 0 },
          ],
          index: 1,
        },
      ],
      index: 4,
    },
  }
  const expected: Kifu = {
    meta: mockMeta,
    history: {
      moves: [
        head,
        mockMove('mock1', 1),
        mockMove('mock2', 2),
        mockMove('mock3', 3),
        mockMove('mock4-1', 4), // 分岐がなくなる
      ],
      index: 4,
    },
  }
  expect(deleteMove(kifu, mockMove('mock4-2', 4))).toEqual(expected)
})

it('分岐を削除できる3', async () => {
  const kifu: Kifu = {
    meta: mockMeta,
    history: {
      moves: [
        head,
        mockMove('mock1', 1),
        mockMove('mock2', 2),
        mockMove('mock3', 3),
        {
          branches: [
            { moves: [mockMove('mock4-1', 4)], index: 0 },
            { moves: [mockMove('mock4-2', 4)], index: 0 },
            { moves: [mockMove('mock4-3', 4)], index: 0 },
          ],
          index: 0,
        },
      ],
      index: 4,
    },
  }
  const expected: Kifu = {
    meta: mockMeta,
    history: {
      moves: [
        head,
        mockMove('mock1', 1),
        mockMove('mock2', 2),
        mockMove('mock3', 3),
        {
          branches: [
            { moves: [mockMove('mock4-2', 4)], index: 0 },
            { moves: [mockMove('mock4-3', 4)], index: 0 },
          ],
          index: 0, // index変更しないパターン
        },
      ],
      index: 4,
    },
  }
  expect(deleteMove(kifu, mockMove('mock4-1', 4))).toEqual(expected)
})

it('分岐から削除できる', async () => {
  const kifu: Kifu = {
    meta: mockMeta,
    history: {
      moves: [
        head,
        mockMove('mock1', 1),
        mockMove('mock2', 2),
        mockMove('mock3', 3),
        {
          branches: [
            { moves: [mockMove('mock4-1', 4)], index: 0 },
            {
              moves: [mockMove('mock4-2', 4), mockMove('mock5-2', 5)],
              index: 0,
            },
          ],
          index: 1,
        },
      ],
      index: 4,
    },
  }
  const expected: Kifu = {
    meta: mockMeta,
    history: {
      moves: [
        head,
        mockMove('mock1', 1),
        mockMove('mock2', 2),
        mockMove('mock3', 3),
        {
          branches: [
            { moves: [mockMove('mock4-1', 4)], index: 0 },
            { moves: [mockMove('mock4-2', 4)], index: 0 },
          ],
          index: 1,
        },
      ],
      index: 4,
    },
  }
  expect(deleteMove(kifu, mockMove('mock5-2', 5))).toEqual(expected)
})
