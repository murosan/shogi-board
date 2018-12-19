import { newGameState } from '../../../model/shogi/GameStateInit'
import { Fu0, Gin0, Gin1, Gyoku0, Gyoku1 } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import Position from '../../../model/shogi/Position'
import emptyPosition from '../../../testutils/emptyPosition'
import gyoku from './gyoku'

describe('玉の動き判定', async () => {
  it('駒のない場所に移動できる(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Gyoku0 // 55
    const expected: Point[] = [
      { row: 3, column: 3 },
      { row: 3, column: 4 },
      { row: 3, column: 5 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
    ]
    expect(gyoku(pos, { row: 4, column: 4, piece: Gyoku0 })).toEqual(expected)
  })

  it('駒のない場所に移動できる(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Gyoku1 // 55
    const expected: Point[] = [
      { row: 3, column: 3 },
      { row: 3, column: 4 },
      { row: 3, column: 5 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
    ]
    expect(gyoku(pos, { row: 4, column: 4, piece: Gyoku1 })).toEqual(expected)
  })

  it('味方の駒があるところには動けない(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Gyoku0 // 55
    pos.pos[3][3] = Gin0 // 44
    const expected: Point[] = [
      { row: 3, column: 4 },
      { row: 3, column: 5 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
    ]
    expect(gyoku(pos, { row: 4, column: 4, piece: Gyoku0 })).toEqual(expected)
  })

  it('味方の駒があるところには動けない(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Gyoku1 // 55
    pos.pos[3][3] = Gin1 // 44
    const expected: Point[] = [
      { row: 3, column: 4 },
      { row: 3, column: 5 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
    ]
    expect(gyoku(pos, { row: 4, column: 4, piece: Gyoku1 })).toEqual(expected)
  })

  it('相手の駒があるところには動ける(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Gyoku0 // 55
    pos.pos[3][3] = Gin1 // 44
    const expected: Point[] = [
      { row: 3, column: 3 },
      { row: 3, column: 4 },
      { row: 3, column: 5 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
    ]
    expect(gyoku(pos, { row: 4, column: 4, piece: Gyoku0 })).toEqual(expected)
  })

  it('相手の駒があるところには動ける(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Gyoku1 // 55
    pos.pos[3][3] = Gin0 // 44
    const expected: Point[] = [
      { row: 3, column: 3 },
      { row: 3, column: 4 },
      { row: 3, column: 5 },
      { row: 4, column: 3 },
      { row: 4, column: 5 },
      { row: 5, column: 3 },
      { row: 5, column: 4 },
      { row: 5, column: 5 },
    ]
    expect(gyoku(pos, { row: 4, column: 4, piece: Gyoku1 })).toEqual(expected)
  })

  it('盤外には動けない(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[0][0] = Gyoku0 // 11
    pos.pos[8][0] = Gyoku0 // 19
    pos.pos[0][8] = Gyoku0 // 91
    pos.pos[8][8] = Gyoku0 // 99
    const expected1: Point[] = [
      { row: 0, column: 1 },
      { row: 1, column: 0 },
      { row: 1, column: 1 },
    ]
    const expected2: Point[] = [
      { row: 7, column: 0 },
      { row: 7, column: 1 },
      { row: 8, column: 1 },
    ]
    const expected3: Point[] = [
      { row: 0, column: 7 },
      { row: 1, column: 7 },
      { row: 1, column: 8 },
    ]
    const expected4: Point[] = [
      { row: 7, column: 7 },
      { row: 7, column: 8 },
      { row: 8, column: 7 },
    ]
    expect(gyoku(pos, { row: 0, column: 0, piece: Gyoku0 })).toEqual(expected1)
    expect(gyoku(pos, { row: 8, column: 0, piece: Gyoku0 })).toEqual(expected2)
    expect(gyoku(pos, { row: 0, column: 8, piece: Gyoku0 })).toEqual(expected3)
    expect(gyoku(pos, { row: 8, column: 8, piece: Gyoku0 })).toEqual(expected4)
  })

  it('盤外には動けない(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[0][0] = Gyoku1 // 11
    pos.pos[8][0] = Gyoku1 // 19
    pos.pos[0][8] = Gyoku1 // 91
    pos.pos[8][8] = Gyoku1 // 99
    const expected1: Point[] = [
      { row: 0, column: 1 },
      { row: 1, column: 0 },
      { row: 1, column: 1 },
    ]
    const expected2: Point[] = [
      { row: 7, column: 0 },
      { row: 7, column: 1 },
      { row: 8, column: 1 },
    ]
    const expected3: Point[] = [
      { row: 0, column: 7 },
      { row: 1, column: 7 },
      { row: 1, column: 8 },
    ]
    const expected4: Point[] = [
      { row: 7, column: 7 },
      { row: 7, column: 8 },
      { row: 8, column: 7 },
    ]
    expect(gyoku(pos, { row: 0, column: 0, piece: Gyoku1 })).toEqual(expected1)
    expect(gyoku(pos, { row: 8, column: 0, piece: Gyoku1 })).toEqual(expected2)
    expect(gyoku(pos, { row: 0, column: 8, piece: Gyoku1 })).toEqual(expected3)
    expect(gyoku(pos, { row: 8, column: 8, piece: Gyoku1 })).toEqual(expected4)
  })

  it('持ち駒から置こうとするとエラー(先手)', async () => {
    const pos: Position = newGameState().pos // 初期局面
    expect(() => gyoku(pos, { row: -1, column: -1, piece: Gyoku0 })).toThrow()
  })

  it('持ち駒から置こうとするとエラー(後手)', async () => {
    const pos: Position = newGameState().pos // 初期局面
    expect(() => gyoku(pos, { row: -1, column: -1, piece: Gyoku1 })).toThrow()
  })

  it('銀以外の駒を渡すとエラー', async () =>
    expect(() =>
      gyoku(emptyPosition(), { row: 4, column: 4, piece: Fu0 })
    ).toThrow())
})
