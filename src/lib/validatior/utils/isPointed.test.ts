import {
  Fu0,
  Fu1,
  Gin0,
  Gin1,
  Gyoku0,
  Gyoku1,
  Hisha0,
  Hisha1,
  Kin0,
  Kin1,
} from '../../../model/shogi/Piece'
import { Gote, Sente } from '../../../model/shogi/Turn'
import emptyPosition from '../../../testutils/emptyPosition'
import isPointed from './isPointed'

describe('isPointed', async () => {
  it('(attacker=先手)相手の駒の効きがあれば true', async () => {
    const pos = emptyPosition()
    pos.pos[8][4] = Hisha0
    pos.pos[4][4] = Fu1
    const point = { row: 4, column: 4, piece: Fu1 }
    expect(isPointed(pos, point, Sente)).toBeTruthy()
  })

  it('(attacker=先手)相手の駒の効きがない場合 false', async () => {
    const pos = emptyPosition()
    pos.pos[8][4] = Hisha0
    pos.pos[4][8] = Fu1
    const point = { row: 4, column: 8, piece: Fu1 }
    expect(isPointed(pos, point, Sente)).toBeFalsy()
  })

  it('(attacker=後手)相手の駒の効きがあれば true', async () => {
    const pos = emptyPosition()
    pos.pos[0][4] = Hisha1
    pos.pos[4][4] = Fu0
    const point = { row: 4, column: 4, piece: Fu0 }
    expect(isPointed(pos, point, Gote)).toBeTruthy()
  })

  it('(attacker=後手)相手の駒の効きがない場合 false', async () => {
    const pos = emptyPosition()
    pos.pos[0][4] = Hisha1
    pos.pos[4][8] = Fu0
    const point = { row: 4, column: 8, piece: Fu0 }
    expect(isPointed(pos, point, Gote)).toBeFalsy()
  })

  it('(attacker=先手)玉を動かして王手放置になる場所には動けない', async () => {
    const pos = emptyPosition()
    pos.pos[1][0] = Fu1
    pos.pos[0][1] = Gin1
    pos.pos[2][1] = Gyoku0
    const point = { row: 1, column: 0, piece: Fu1 }
    expect(isPointed(pos, point, Sente)).toBeFalsy()
  })

  it('(attacker=後手)玉を動かして王手放置になる場所には動けない', async () => {
    const pos = emptyPosition()
    pos.pos[7][8] = Fu0
    pos.pos[8][7] = Gin0
    pos.pos[6][7] = Gyoku1
    const point = { row: 7, column: 8, piece: Fu0 }
    expect(isPointed(pos, point, Gote)).toBeFalsy()
  })

  it('(attacker=先手)玉を動かしても王手放置にならなければ true', async () => {
    const pos = emptyPosition()
    pos.pos[2][1] = Fu1
    pos.pos[3][2] = Gyoku0
    const point = { row: 2, column: 1, piece: Fu1 }
    expect(isPointed(pos, point, Sente)).toBeTruthy()
  })

  it('(attacker=後手)玉を動かしても王手放置にならなければ true', async () => {
    const pos = emptyPosition()
    pos.pos[7][8] = Fu0
    pos.pos[6][7] = Gyoku1
    const point = { row: 7, column: 8, piece: Fu0 }
    expect(isPointed(pos, point, Gote)).toBeTruthy()
  })

  it('(attacker=先手)玉を動かして王手放置になろうが、相手玉を取る位置であれば true', async () => {
    const pos = emptyPosition()
    pos.pos[0][0] = Gyoku1
    pos.pos[0][4] = Hisha1
    pos.pos[1][1] = Gyoku0
    const point = { row: 0, column: 0, piece: Gyoku1 }
    expect(isPointed(pos, point, Sente)).toBeTruthy()
  })

  it('(attacker=後手)玉を動かして王手放置になろうが、相手玉を取る位置であれば true', async () => {
    const pos = emptyPosition()
    pos.pos[8][8] = Gyoku0
    pos.pos[8][4] = Hisha0
    pos.pos[7][7] = Gyoku1
    const point = { row: 8, column: 8, piece: Gyoku0 }
    expect(isPointed(pos, point, Gote)).toBeTruthy()
  })

  it('(attacker=先手)玉を動かすと王手放置になるが、別の駒で取れる場合 true', async () => {
    const pos = emptyPosition()
    pos.pos[8][0] = Gyoku0
    pos.pos[8][1] = Kin0
    pos.pos[7][0] = Kin1
    pos.pos[6][0] = Fu1
    const point = { row: 7, column: 0, piece: Kin1 }
    expect(isPointed(pos, point, Sente)).toBeTruthy()
  })

  it('(attacker=後手)玉を動かすと王手放置になるが、別の駒で取れる場合 true', async () => {
    const pos = emptyPosition()
    pos.pos[0][0] = Gyoku1
    pos.pos[0][1] = Kin1
    pos.pos[1][0] = Kin0
    pos.pos[2][0] = Fu0
    const point = { row: 1, column: 0, piece: Kin0 }
    expect(isPointed(pos, point, Gote)).toBeTruthy()
  })
})
