import Kif, { newKif } from '../../model/kif/Kif'
import { mockKif, mockMove } from '../../testutils/mockKif'
import getCurrentIndex from './getCurrentIndex'

it('分岐のない棋譜で index を取得できる', async () => {
  const k: Kif = newKif()
  for (let i = 0; i < 10; i++) k.history.moves.push(mockMove('mock'))
  k.history.index = 9

  expect(getCurrentIndex(k)).toEqual(9)
})

it('分岐のある棋譜で index を取得できる', async () =>
  expect(getCurrentIndex(mockKif())).toEqual(5))
