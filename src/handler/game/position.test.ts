import { Empty, Fu0, Kin1, Kin0, To0, To1, Fu1 } from '../../model/shogi/Piece'
import { Position } from '../../model/shogi/Position'
import { hirate } from '../../model/shogi/InitialPositions'
import { move, moveBoardOnly } from './position'
import { Gote, Sente } from '../../model/shogi/Turn'

describe('move', () => {
  it('盤上の駒を動かすことができる(先手)', async () => {
    const pos: Position = hirate()
    const expected: Position = hirate()
    expected.pos[5][6] = Fu0
    expected.pos[6][6] = Empty
    expected.moveCount += 1
    expected.turn = Gote
    expect(
      move({
        pos,
        source: { row: 6, column: 6 },
        dest: { row: 5, column: 6 },
        piece: Fu0,
      })
    ).toEqual(expected)
  })

  it('盤上の駒を動かすことができる(後手)', async () => {
    const pos: Position = hirate()
    pos.turn = Gote
    const expected: Position = hirate()
    expected.pos[3][2] = Fu1
    expected.pos[2][2] = Empty
    expected.moveCount += 1
    expected.turn = Sente
    expect(
      move({
        pos,
        source: { row: 2, column: 2 },
        dest: { row: 3, column: 2 },
        piece: Fu1,
      })
    ).toEqual(expected)
  })

  it('持ち駒を置くことができる(先手)', async () => {
    const pos: Position = hirate()
    pos.cap0[Fu0 - 1] = 1
    const expected: Position = hirate()
    expected.pos[4][4] = Fu0
    expected.moveCount += 1
    expected.turn = Gote
    expect(
      move({
        pos,
        source: { row: -1, column: -1 },
        dest: { row: 4, column: 4 },
        piece: Fu0,
      })
    ).toEqual(expected)
  })

  it('持ち駒を置くことができる(後手)', async () => {
    const pos: Position = hirate()
    pos.cap1[Fu0 - 1] = 1
    pos.turn = Gote
    const expected: Position = hirate()
    expected.pos[4][4] = Fu1
    expected.moveCount += 1
    expected.turn = Sente
    expect(
      move({
        pos,
        source: { row: -1, column: -1 },
        dest: { row: 4, column: 4 },
        piece: Fu1,
      })
    ).toEqual(expected)
  })

  it('移動先が相手の駒なら自分の持ち駒が増える(先手)', async () => {
    const pos: Position = hirate()
    pos.pos[5][6] = Kin1
    const expected: Position = hirate()
    expected.pos[5][6] = Fu0
    expected.pos[6][6] = Empty
    expected.cap0[Kin0 - 1] = 1
    expected.moveCount += 1
    expected.turn = Gote
    expect(
      move({
        pos,
        source: { row: 6, column: 6 },
        dest: { row: 5, column: 6 },
        piece: Fu0,
      })
    ).toEqual(expected)
  })

  it('移動先が相手の駒なら自分の持ち駒が増える(後手)', async () => {
    const pos: Position = hirate()
    pos.pos[3][2] = Kin0
    pos.turn = Gote
    const expected: Position = hirate()
    expected.pos[3][2] = Fu1
    expected.pos[2][2] = Empty
    expected.cap1[Kin0 - 1] = 1
    expected.moveCount += 1
    expected.turn = Sente
    expect(
      move({
        pos,
        source: { row: 2, column: 2 },
        dest: { row: 3, column: 2 },
        piece: Fu1,
      })
    ).toEqual(expected)
  })

  it('移動先が相手の成駒なら成る前の駒が増える(先手)', async () => {
    const pos: Position = hirate()
    pos.pos[5][6] = To1
    const expected: Position = hirate()
    expected.pos[5][6] = Fu0
    expected.pos[6][6] = Empty
    expected.cap0[Fu0 - 1] = 1
    expected.moveCount += 1
    expected.turn = Gote
    expect(
      move({
        pos,
        source: { row: 6, column: 6 },
        dest: { row: 5, column: 6 },
        piece: Fu0,
      })
    ).toEqual(expected)
  })

  it('移動先が相手の成駒なら成る前の駒が増える(後手)', async () => {
    const pos: Position = hirate()
    pos.pos[3][2] = To0
    pos.turn = Gote
    const expected: Position = hirate()
    expected.pos[3][2] = Fu1
    expected.pos[2][2] = Empty
    expected.cap1[Fu0 - 1] = 1
    expected.moveCount += 1
    expected.turn = Sente
    expect(
      move({
        pos,
        source: { row: 2, column: 2 },
        dest: { row: 3, column: 2 },
        piece: Fu1,
      })
    ).toEqual(expected)
  })
})

describe('moveBoardOnly', () => {
  it('盤上の駒を動かせる', async () => {
    const pos: Position = hirate()
    const expected: Position = hirate()
    expected.pos[5][6] = Fu0
    expected.pos[6][6] = Empty
    expected.moveCount += 1
    expected.turn = Gote
    expect(
      moveBoardOnly({
        pos,
        source: { row: 6, column: 6 },
        dest: { row: 5, column: 6 },
        piece: Fu0,
      })
    ).toEqual(expected)
  })

  it('持ち駒を置くことができるが、持ち駒は変化しない', async () => {
    const pos: Position = hirate()
    pos.cap0[Fu0 - 1] = 1
    const expected: Position = hirate()
    expected.pos[4][4] = Fu0
    expected.cap0[Fu0 - 1] = 1
    expected.moveCount += 1
    expected.turn = Gote
    expect(
      moveBoardOnly({
        pos,
        source: { row: -1, column: -1 },
        dest: { row: 4, column: 4 },
        piece: Fu0,
      })
    ).toEqual(expected)
  })
})
