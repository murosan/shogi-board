import { Kin0, Kin1, Uma0, Uma1 } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import { Position } from '../../../model/shogi/Position'
import { emptyPosition } from '../../../testutils/emptyPosition'
import uma from './uma'

describe('馬の動き判定', () => {
  it('障害物がないとき、角と玉を合わせた動きができる', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Uma0 // 55
    const expected: Point[] = [
      { row: 0, column: 0 },
      { row: 0, column: 8 },
      { row: 1, column: 1 },
      { row: 1, column: 7 },
      { row: 2, column: 2 },
      { row: 2, column: 6 },
      { row: 3, column: 3 },
      { row: 3, column: 4 },
      { row: 3, column: 5 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
      { row: 6, column: 2 },
      { row: 6, column: 6 },
      { row: 7, column: 1 },
      { row: 7, column: 7 },
      { row: 8, column: 0 },
      { row: 8, column: 8 },
    ]
    expect(uma(pos, { row: 4, column: 4, piece: Uma0 })).toEqual(expected)
    expect(uma(pos, { row: 4, column: 4, piece: Uma1 })).toEqual(expected)
  })

  it('味方の駒があるところには移動できない(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[2][2] = Kin0 // 33
    pos.pos[2][6] = Kin0 // 73
    pos.pos[6][2] = Kin0 // 37
    pos.pos[6][6] = Kin0 // 77
    pos.pos[3][4] = Kin0 // 54
    const expected: Point[] = [
      { row: 3, column: 3 },
      { row: 3, column: 5 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
    ]
    expect(uma(pos, { row: 4, column: 4, piece: Uma0 })).toEqual(expected)
  })

  it('味方の駒があるところには移動できない(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[2][2] = Kin1 // 33
    pos.pos[2][6] = Kin1 // 73
    pos.pos[6][2] = Kin1 // 37
    pos.pos[6][6] = Kin1 // 77
    pos.pos[3][4] = Kin1 // 54
    const expected: Point[] = [
      { row: 3, column: 3 },
      { row: 3, column: 5 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
    ]
    expect(uma(pos, { row: 4, column: 4, piece: Uma1 })).toEqual(expected)
  })

  it('相手の駒のある場所には移動できる(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[2][2] = Kin1 // 33
    pos.pos[2][6] = Kin1 // 73
    pos.pos[6][2] = Kin1 // 37
    pos.pos[6][6] = Kin1 // 77
    pos.pos[3][4] = Kin1 // 54
    const expected: Point[] = [
      { row: 2, column: 2 },
      { row: 2, column: 6 },
      { row: 3, column: 3 },
      { row: 3, column: 4 },
      { row: 3, column: 5 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
      { row: 6, column: 2 },
      { row: 6, column: 6 },
    ]
    expect(uma(pos, { row: 4, column: 4, piece: Uma0 })).toEqual(expected)
  })

  it('相手の駒のある場所には移動できる(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[2][2] = Kin0 // 33
    pos.pos[2][6] = Kin0 // 73
    pos.pos[6][2] = Kin0 // 37
    pos.pos[6][6] = Kin0 // 77
    pos.pos[3][4] = Kin0 // 54
    const expected: Point[] = [
      { row: 2, column: 2 },
      { row: 2, column: 6 },
      { row: 3, column: 3 },
      { row: 3, column: 4 },
      { row: 3, column: 5 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
      { row: 6, column: 2 },
      { row: 6, column: 6 },
    ]
    expect(uma(pos, { row: 4, column: 4, piece: Uma1 })).toEqual(expected)
  })

  it('持ち駒を置こうとするとエラー(先手)', async () =>
    expect(() =>
      uma(emptyPosition(), { row: -1, column: -1, piece: Uma0 })
    ).toThrow())

  it('持ち駒を置こうとするとエラー(後手)', async () =>
    expect(() =>
      uma(emptyPosition(), { row: -1, column: -1, piece: Uma1 })
    ).toThrow())

  it('馬以外の駒を渡すとエラー', async () =>
    expect(() =>
      uma(emptyPosition(), { row: 4, column: 4, piece: Kin0 })
    ).toThrow())
})
