import Kifu from '../../model/kifu/Kifu'
import Meta from '../../model/kifu/Meta'
import { Move } from '../../model/kifu/Move'
import { mockMove } from '../../testutils/mockKifu'
import { changeIndex } from './changeIndex'

const mockMeta: Meta = {
  version: '1',
  player: { sente: '', gote: '' },
  handicap: '平手',
}
const moveMock: Move = mockMove('mock0', 0)

it('棋譜のインデックスを更新できる', async () => {
  const kifu: Kifu = {
    meta: mockMeta,
    history: {
      moves: [moveMock, moveMock, moveMock, moveMock, moveMock, moveMock],
      index: 5,
    },
  }
  const expected: Kifu = {
    meta: mockMeta,
    history: {
      moves: [moveMock, moveMock, moveMock, moveMock, moveMock, moveMock],
      index: 0,
    },
  }
  expect(changeIndex(kifu, 0)).toEqual(expected)
})

it('棋譜のインデックスを更新できる2', async () => {
  const kifu: Kifu = {
    meta: mockMeta,
    history: {
      moves: [moveMock, moveMock, moveMock, moveMock, moveMock, moveMock],
      index: 0,
    },
  }
  const expected: Kifu = {
    meta: mockMeta,
    history: {
      moves: [moveMock, moveMock, moveMock, moveMock, moveMock, moveMock],
      index: 5,
    },
  }
  expect(changeIndex(kifu, 5)).toEqual(expected)
})

it('インデックスが最大値を超えていても最後に設定できる', async () => {
  const kifu: Kifu = {
    meta: mockMeta,
    history: {
      moves: [moveMock, moveMock, moveMock, moveMock, moveMock, moveMock],
      index: 0,
    },
  }
  const expected: Kifu = {
    meta: mockMeta,
    history: {
      moves: [moveMock, moveMock, moveMock, moveMock, moveMock, moveMock],
      index: 5,
    },
  }
  expect(changeIndex(kifu, 100)).toEqual(expected)
})

it('分岐が入っていても更新できる', async () => {
  const kifu: Kifu = {
    meta: mockMeta,
    history: {
      moves: [
        moveMock,
        {
          branches: [
            { moves: [moveMock], index: 0 },
            { moves: [moveMock, moveMock, moveMock], index: 0 },
          ],
          index: 1,
        },
      ],
      index: 1,
    },
  }
  const expected: Kifu = {
    meta: mockMeta,
    history: {
      moves: [
        moveMock,
        {
          branches: [
            { moves: [moveMock], index: 0 },
            { moves: [moveMock, moveMock, moveMock], index: 2 },
          ],
          index: 1,
        },
      ],
      index: 1,
    },
  }
  expect(changeIndex(kifu, 3)).toEqual(expected)
})

it('分岐が入っていても更新できる2', async () => {
  const kifu: Kifu = {
    meta: mockMeta,
    history: {
      moves: [
        moveMock,
        {
          branches: [
            { moves: [moveMock], index: 0 },
            { moves: [moveMock, moveMock, moveMock], index: 0 },
          ],
          index: 1,
        },
      ],
      index: 1,
    },
  }
  const expected: Kifu = {
    meta: mockMeta,
    history: {
      moves: [
        moveMock,
        {
          branches: [
            { moves: [moveMock], index: 0 },
            { moves: [moveMock, moveMock, moveMock], index: 0 },
          ],
          index: 1,
        },
      ],
      index: 1,
    },
  }
  expect(changeIndex(kifu, 1)).toEqual(expected)
})

it('違う分岐を選択できる', async () => {
  const kifu: Kifu = {
    meta: mockMeta,
    history: {
      moves: [
        moveMock,
        {
          branches: [
            { moves: [moveMock], index: 0 },
            {
              moves: [
                moveMock,
                moveMock,
                {
                  branches: [
                    { moves: [moveMock, moveMock], index: 1 },
                    { moves: [moveMock, moveMock], index: 1 },
                  ],
                  index: 1,
                },
              ],
              index: 0,
            },
          ],
          index: 1,
        },
      ],
      index: 1,
    },
  }
  const expected: Kifu = {
    meta: mockMeta,
    history: {
      moves: [
        moveMock,
        {
          branches: [
            { moves: [moveMock], index: 0 },
            {
              moves: [
                moveMock,
                moveMock,
                {
                  branches: [
                    { moves: [moveMock, moveMock], index: 0 },
                    { moves: [moveMock, moveMock], index: 0 },
                  ],
                  index: 1,
                },
              ],
              index: 0,
            },
          ],
          index: 0,
        },
      ],
      index: 1,
    },
  }
  expect(changeIndex(kifu, 1, 0)).toEqual(expected)
})
