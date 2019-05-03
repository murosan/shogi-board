import Kif from '../../model/kif/Kif'
import Meta from '../../model/kif/Meta'
import { Move } from '../../model/kif/Move'
import { Position } from '../../model/shogi/Position'
import { Sente } from '../../model/shogi/Turn'
import { mockMove } from '../../testutils/mockKif'
import { changeIndex } from './changeIndex'

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
const moveMock: Move = mockMove('mock0', 0)

it('棋譜のインデックスを更新できる', async () => {
  const kif: Kif = {
    meta: mockMeta,
    history: {
      moves: [moveMock, moveMock, moveMock, moveMock, moveMock, moveMock],
      index: 5,
    },
  }
  const expected: Kif = {
    meta: mockMeta,
    history: {
      moves: [moveMock, moveMock, moveMock, moveMock, moveMock, moveMock],
      index: 0,
    },
  }
  expect(changeIndex(kif, 0)).toEqual(expected)
})

it('棋譜のインデックスを更新できる2', async () => {
  const kif: Kif = {
    meta: mockMeta,
    history: {
      moves: [moveMock, moveMock, moveMock, moveMock, moveMock, moveMock],
      index: 0,
    },
  }
  const expected: Kif = {
    meta: mockMeta,
    history: {
      moves: [moveMock, moveMock, moveMock, moveMock, moveMock, moveMock],
      index: 5,
    },
  }
  expect(changeIndex(kif, 5)).toEqual(expected)
})

it('インデックスが最大値を超えていても最後に設定できる', async () => {
  const kif: Kif = {
    meta: mockMeta,
    history: {
      moves: [moveMock, moveMock, moveMock, moveMock, moveMock, moveMock],
      index: 0,
    },
  }
  const expected: Kif = {
    meta: mockMeta,
    history: {
      moves: [moveMock, moveMock, moveMock, moveMock, moveMock, moveMock],
      index: 5,
    },
  }
  expect(changeIndex(kif, 100)).toEqual(expected)
})

it('分岐が入っていても更新できる', async () => {
  const kif: Kif = {
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
  const expected: Kif = {
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
  expect(changeIndex(kif, 3)).toEqual(expected)
})

it('分岐が入っていても更新できる2', async () => {
  const kif: Kif = {
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
  const expected: Kif = {
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
  expect(changeIndex(kif, 1)).toEqual(expected)
})

it('違う分岐を選択できる', async () => {
  const kif: Kif = {
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
  const expected: Kif = {
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
  expect(changeIndex(kif, 1, 0)).toEqual(expected)
})
