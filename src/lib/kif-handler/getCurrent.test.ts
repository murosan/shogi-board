import Kif, { newKif } from '../../model/kif/Kif'
import { mockKif, mockMove } from '../../testutils/mockKif'
import getCurrent from './getCurrent'

it('分岐のない棋譜で index を取得できる', async () => {
  const k: Kif = newKif()
  for (let i = 1; i <= 10; i++) k.history.moves.push(mockMove('mock', i))
  k.history.index = 9

  expect(getCurrent(k)).toEqual(mockMove('mock', 9))
})

it('分岐のある棋譜で index を取得できる', async () =>
  expect(getCurrent(mockKif())).toEqual(mockMove('mock5', 5)))
