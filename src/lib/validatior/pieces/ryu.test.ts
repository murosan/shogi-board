import { Kin0, Kin1, Ryu0, Ryu1 } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import Position from '../../../model/shogi/Position'
import emptyPosition from '../../../testutils/emptyPosition'
import ryu from './ryu'

describe('龍の動き判定', async () => {
  it('障害物がないとき、飛車と玉を合わせた動きができる', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Ryu0 // 55
    const expected: Set<Point> = new Set([
      { row: 0, column: 4 },
      { row: 1, column: 4 },
      { row: 2, column: 4 },
      { row: 3, column: 4 },
      { row: 5, column: 4 },
      { row: 6, column: 4 },
      { row: 7, column: 4 },
      { row: 8, column: 4 },
      { row: 4, column: 0 },
      { row: 4, column: 1 },
      { row: 4, column: 2 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 4, column: 6 },
      { row: 4, column: 7 },
      { row: 4, column: 8 },
      { row: 3, column: 3 },
      { row: 5, column: 3 },
      { row: 3, column: 5 },
      { row: 5, column: 5 },
    ])
    const res1: Point[] = ryu(pos, { row: 4, column: 4, piece: Ryu0 })
    const res2: Point[] = ryu(pos, { row: 4, column: 4, piece: Ryu1 })
    expect(new Set(res1)).toEqual(expected)
    expect(new Set(res2)).toEqual(expected)
  })

  it('味方の駒があるところには移動できない(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Ryu0 // 55
    pos.pos[2][4] = Kin0 // 53
    pos.pos[6][4] = Kin0 // 57
    pos.pos[4][2] = Kin0 // 35
    pos.pos[4][6] = Kin0 // 75
    pos.pos[3][3] = Kin0 // 44
    const expected: Set<Point> = new Set([
      { row: 3, column: 4 },
      { row: 5, column: 4 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 3 },
      { row: 3, column: 5 },
      { row: 5, column: 5 },
    ])
    const res: Point[] = ryu(pos, { row: 4, column: 4, piece: Ryu0 })
    expect(new Set(res)).toEqual(expected)
  })

  it('味方の駒があるところには移動できない(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Ryu1 // 55
    pos.pos[2][4] = Kin1 // 53
    pos.pos[6][4] = Kin1 // 57
    pos.pos[4][2] = Kin1 // 35
    pos.pos[4][6] = Kin1 // 75
    pos.pos[3][3] = Kin1 // 44
    const expected: Set<Point> = new Set([
      { row: 3, column: 4 },
      { row: 5, column: 4 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 3 },
      { row: 3, column: 5 },
      { row: 5, column: 5 },
    ])
    const res: Point[] = ryu(pos, { row: 4, column: 4, piece: Ryu1 })
    expect(new Set(res)).toEqual(expected)
  })

  it('相手の駒のある場所には移動できる(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Ryu0 // 55
    pos.pos[2][4] = Kin1 // 53
    pos.pos[6][4] = Kin1 // 57
    pos.pos[4][2] = Kin1 // 35
    pos.pos[4][6] = Kin1 // 75
    pos.pos[3][3] = Kin1 // 44
    const expected: Set<Point> = new Set([
      { row: 2, column: 4 },
      { row: 3, column: 4 },
      { row: 5, column: 4 },
      { row: 6, column: 4 },
      { row: 4, column: 2 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 4, column: 6 },
      { row: 3, column: 3 },
      { row: 5, column: 3 },
      { row: 3, column: 5 },
      { row: 5, column: 5 },
    ])
    const res: Point[] = ryu(pos, { row: 4, column: 4, piece: Ryu0 })
    expect(new Set(res)).toEqual(expected)
  })

  it('相手の駒のある場所には移動できる(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Ryu1 // 55
    pos.pos[2][4] = Kin0 // 53
    pos.pos[6][4] = Kin0 // 57
    pos.pos[4][2] = Kin0 // 35
    pos.pos[4][6] = Kin0 // 75
    pos.pos[3][3] = Kin0 // 44
    const expected: Set<Point> = new Set([
      { row: 2, column: 4 },
      { row: 3, column: 4 },
      { row: 5, column: 4 },
      { row: 6, column: 4 },
      { row: 4, column: 2 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 4, column: 6 },
      { row: 3, column: 3 },
      { row: 5, column: 3 },
      { row: 3, column: 5 },
      { row: 5, column: 5 },
    ])
    const res: Point[] = ryu(pos, { row: 4, column: 4, piece: Ryu1 })
    expect(new Set(res)).toEqual(expected)
  })

  it('持ち駒を置こうとするとエラー(先手)', async () =>
    expect(() =>
      ryu(emptyPosition(), { row: -1, column: -1, piece: Ryu0 })
    ).toThrow())

  it('持ち駒を置こうとするとエラー(後手)', async () =>
    expect(() =>
      ryu(emptyPosition(), { row: -1, column: -1, piece: Ryu1 })
    ).toThrow())

  it('龍以外の駒を渡すとエラー', async () =>
    expect(() =>
      ryu(emptyPosition(), { row: 4, column: 4, piece: Kin0 })
    ).toThrow())
})
