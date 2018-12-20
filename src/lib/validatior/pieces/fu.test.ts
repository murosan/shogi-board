import { newGameState } from '../../../model/shogi/GameStateInit'
import { Fu0, Fu1, Gin0 } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import Position from '../../../model/shogi/Position'
import emptyPosition from '../../../testutils/emptyPosition'
import fu from './fu'

describe('歩の動き判定', async () => {
  it('駒のない場所に移動できる(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Fu0 // 55
    const expected: Point[] = [{ row: 3, column: 4 }]
    expect(fu(pos, { row: 4, column: 4, piece: Fu0 })).toEqual(expected)
  })

  it('駒のない場所に移動できる(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Fu1 // 55
    const expected: Point[] = [{ row: 5, column: 4 }]
    expect(fu(pos, { row: 4, column: 4, piece: Fu1 })).toEqual(expected)
  })

  it('味方の駒があるところには動けない(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Fu0 // 55
    pos.pos[3][4] = Fu0 // 54
    const expected: Point[] = []
    expect(fu(pos, { row: 4, column: 4, piece: Fu0 })).toEqual(expected)
  })

  it('味方の駒があるところには動けない(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Fu1 // 55
    pos.pos[5][4] = Fu1 // 56
    const expected: Point[] = []
    expect(fu(pos, { row: 4, column: 4, piece: Fu1 })).toEqual(expected)
  })

  it('相手の駒があるところには動ける(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Fu0 // 55
    pos.pos[3][4] = Fu1 // 54
    const expected: Point[] = [{ row: 3, column: 4 }]
    expect(fu(pos, { row: 4, column: 4, piece: Fu0 })).toEqual(expected)
  })

  it('相手の駒があるところには動ける(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[4][4] = Fu1 // 55
    pos.pos[5][4] = Fu0 // 56
    const expected: Point[] = [{ row: 5, column: 4 }]
    expect(fu(pos, { row: 4, column: 4, piece: Fu1 })).toEqual(expected)
  })

  it('盤外には動けない(先手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[0][4] = Fu0 // 51。と金になってなければいけないが、一応テスト
    const expected: Point[] = []
    expect(fu(pos, { row: 0, column: 4, piece: Fu0 })).toEqual(expected)
  })

  it('盤外には動けない(後手)', async () => {
    const pos: Position = emptyPosition()
    pos.pos[8][4] = Fu1 // 59。と金になってなければいけないが、一応テスト
    const expected: Point[] = []
    expect(fu(pos, { row: 8, column: 4, piece: Fu1 })).toEqual(expected)
  })

  it('持ち駒から置くとき、2歩の場所には置けない(先手)', async () => {
    const pos: Position = newGameState().pos // 初期局面
    expect(fu(pos, { row: -1, column: -1, piece: Fu0 })).toEqual([])
  })

  it('持ち駒から置くとき、2歩の場所には置けない(後手)', async () => {
    const pos: Position = newGameState().pos // 初期局面
    expect(fu(pos, { row: -1, column: -1, piece: Fu1 })).toEqual([])
  })

  it('持ち駒を1行目以外の空白マスに置ける(先手)', async () => {
    const pos: Position = emptyPosition() // 初期局面
    const s: Set<string> = new Set()
    const points: Point[] = fu(pos, { row: -1, column: -1, piece: Fu0 })
    points.forEach(p => s.add(`${p.row}${p.column}`))
    expect(points).toHaveLength(72)
    expect(s.size).toEqual(72)
    expect(points.every(p => p.row !== 0)).toBeTruthy()
  })

  it('持ち駒を9行目以外空白マスに置ける(後手)', async () => {
    const pos: Position = emptyPosition()
    const s: Set<string> = new Set()
    const points: Point[] = fu(pos, { row: -1, column: -1, piece: Fu1 })
    points.forEach(p => s.add(`${p.row}${p.column}`))
    expect(points).toHaveLength(72)
    expect(s.size).toEqual(72)
    expect(points.every(p => p.row !== 8)).toBeTruthy()
  })

  it('歩以外の駒を渡すとエラー', async () =>
    expect(() =>
      fu(emptyPosition(), { row: 4, column: 4, piece: Gin0 })
    ).toThrow())
})
