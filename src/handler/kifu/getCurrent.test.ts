import Kifu, { newKifu } from '../../model/kifu/Kifu'
import { mockKifu, mockMove } from '../../testutils/mockKifu'
import getCurrent from './getCurrent'

it('分岐のない棋譜で index を取得できる', async () => {
  const k: Kifu = newKifu()
  for (let i = 1; i <= 10; i++) k.history.moves.push(mockMove('mock', i))
  k.history.index = 9

  expect(getCurrent(k)).toEqual(mockMove('mock', 9))
})

it('分岐のある棋譜で index を取得できる', async () =>
  expect(getCurrent(mockKifu())).toEqual(mockMove('mock5', 5)))
