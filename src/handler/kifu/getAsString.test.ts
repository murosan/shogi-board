import Kifu from '../../model/kifu/Kifu'
import Meta from '../../model/kifu/Meta'
import { Position } from '../../model/shogi/Position'
import { Sente } from '../../model/shogi/Turn'
import { mockKifu } from '../../testutils/mockKifu'
import { getAsString } from './getAsString'

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

it('棋譜を文字列で取得できる', async () => {
  const expected = '1 mock1\n2 mock2\n3 mock3\n4 mock4\n5 mock5'
  expect(getAsString(mockKifu())).toEqual(expected)
})

it('棋譜が初期化されてなくても空文字が返る', async () => {
  const kifu: Kifu = {
    meta: mockMeta,
    history: {
      moves: [],
      index: 0,
    },
  }
  expect(getAsString(kifu)).toEqual('')
})
