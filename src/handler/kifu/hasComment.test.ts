import Kifu from '../../model/kifu/Kifu'
import Meta from '../../model/kifu/Meta'
import { mockMove } from '../../testutils/mockKifu'
import { hasComment } from './hasComment'

const mockMeta: Meta = {
  version: '1',
  player: { sente: '', gote: '' },
  handicap: '平手',
}
const moveMock = () => mockMove('mock0', 0)

it('コメントがあればtrue', () => {
  const m = moveMock()
  m.comment = 'comment'

  const kifu: Kifu = {
    meta: mockMeta,
    history: {
      moves: [moveMock(), moveMock(), m],
      index: 2,
    },
  }
  expect(hasComment(kifu)).toBeTruthy()
})

it('コメントがなければfalse', () => {
  const kifu: Kifu = {
    meta: mockMeta,
    history: {
      moves: [moveMock(), moveMock(), moveMock()],
      index: 2,
    },
  }
  expect(hasComment(kifu)).toBeFalsy()
})

it('分岐もチェックする', () => {
  const m = moveMock()
  m.comment = 'comment'

  const kifu: Kifu = {
    meta: mockMeta,
    history: {
      moves: [
        moveMock(),
        moveMock(),
        {
          branches: [
            { index: 0, moves: [moveMock()] },
            { index: 0, moves: [m] },
          ],
          index: 1,
        },
      ],
      index: 2,
    },
  }
  expect(hasComment(kifu)).toBeTruthy()
})
