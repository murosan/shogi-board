import { Empty, Gyoku0, Gyoku1 } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import { hirate } from '../../../model/shogi/PositionInit'
import { Gote, Sente } from '../../../model/shogi/Turn'
import getGyokuPoint from './getGyokuPoint'

describe('getGyokuPoint', async () => {
  it('先手玉の位置を取得できる', async () => {
    const pos: number[][] = hirate().pos
    const expected: Point = {
      row: 8,
      column: 4,
      piece: Gyoku0,
    }
    expect(getGyokuPoint(pos, Sente)).toEqual(expected)
  })

  it('後手玉の位置を取得できる', async () => {
    const pos: number[][] = hirate().pos
    const expected: Point = {
      row: 0,
      column: 4,
      piece: Gyoku1,
    }
    expect(getGyokuPoint(pos, Gote)).toEqual(expected)
  })

  it('玉がない時 undefined が返る', async () => {
    const pos: number[][] = hirate().pos
    pos[8][4] = Empty
    expect(getGyokuPoint(pos, Sente)).toBeUndefined()
  })
})
