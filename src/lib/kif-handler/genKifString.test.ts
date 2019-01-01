import MoveProps from '../../model/events/MoveProps'
import { Fu0, To0 } from '../../model/shogi/Piece'
import Position from '../../model/shogi/Position'
import { Sente } from '../../model/shogi/Turn'
import { genKifString } from './genKifString'

const mockPos: Position = {
  pos: [],
  cap0: [],
  cap1: [],
  turn: Sente,
  moveCount: 1,
}

it('盤上の駒を動かす場合に、正しい棋譜を生成できる', async () => {
  const p: MoveProps = {
    pos: mockPos,
    source: { row: 6, column: 6 },
    dest: { row: 5, column: 6 },
    piece: Fu0,
  }
  expect(genKifString(p)).toEqual('７六歩(77)')
})

it('持ち駒から打つ場合、正しい棋譜を生成できる', async () => {
  const p: MoveProps = {
    pos: mockPos,
    source: { row: -1, column: -1 },
    dest: { row: 4, column: 4 },
    piece: Fu0,
  }
  expect(genKifString(p)).toEqual('５五歩打')
})

it('成る場合も、正しい棋譜を生成できる', async () => {
  const p: MoveProps = {
    pos: mockPos,
    source: { row: 3, column: 1 },
    dest: { row: 2, column: 1 },
    piece: To0,
    promote: true,
  }
  expect(genKifString(p)).toEqual('２三歩成(24)')
})

it('不成の場合も、正しい棋譜を生成できる', async () => {
  const p: MoveProps = {
    pos: mockPos,
    source: { row: 3, column: 1 },
    dest: { row: 2, column: 1 },
    piece: Fu0,
    promote: false,
  }
  expect(genKifString(p)).toEqual('２三歩不成(24)')
})
