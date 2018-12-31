import Kif, { newKif } from '../../model/kif/Kif'
import Move from '../../model/kif/Move'
import Position from '../../model/shogi/Position'
import { hirate } from '../../model/shogi/PositionInit'
import getCurrentIndex from './getCurrentIndex'
import { mockKif } from '../../testutils/mockKif'

const mockPos: Position = hirate()
const mockMove: Move = { str: 'mock', pos: mockPos }

it('分岐のない棋譜で index を取得できる', async () => {
  const k: Kif = newKif()
  for (let i = 0; i < 10; i++) k.history.moves.push(mockMove)
  k.history.index = 9

  expect(getCurrentIndex(k)).toEqual(9)
})

it('分岐のある棋譜で index を取得できる', async () =>
  expect(getCurrentIndex(mockKif())).toEqual(6))
