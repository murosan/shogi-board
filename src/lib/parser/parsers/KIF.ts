import { canPromote } from '../../../handler/game/piece'
import { move as movePos } from '../../../handler/game/position'
import { genKifuString } from '../../../handler/kifu/genKifuString'
import getCurrent from '../../../handler/kifu/getCurrent'
import pushMove from '../../../handler/kifu/pushMove'
import { MoveProps } from '../../../model/events/MoveProps'
import Kifu, { newKifu } from '../../../model/kifu/Kifu'
import Meta, { Versions } from '../../../model/kifu/Meta'
import { Move } from '../../../model/kifu/Move'
import { HandicapKinds } from '../../../model/shogi/InitialPositions'
import { Piece } from '../../../model/shogi/Piece'
import Point from '../../../model/shogi/Point'
import { Position } from '../../../model/shogi/Position'
import { literal, oneOf, Parser, rep, s, success } from '../parser'
import {
  column as columnParser,
  integer,
  piece as pieceParser,
  row as rowParser,
  time,
  totalTime,
} from './util'

const ln: Parser<string> = s('\n')
const noln: Parser<string> = rep(oneOf([' ', '\t', '\r'])).map(a => a.join(''))
const ss = (str: string) => noln.right(s(str)).left(noln)
function spacing<T>(parser: Parser<T>): Parser<T> {
  return noln.right(parser).left(noln)
}

const toDate: (s: string) => Date | null = s => {
  const d = new Date(s)
  if (isNaN(d.getTime())) return null
  return d
}

// コメント(棋譜コメントではない)
export const cmt: Parser<string> = noln
  .right(s('#'))
  .right(literal(ln).fallback(''))
  .left(ln)

const metaCmt: Parser<[string, string]> = cmt.map(_ => ['', ''])
const metaBlank: Parser<[string, string]> = noln.right(ln).map(_ => ['', ''])

const metaToken = s('：')
export const metaField: Parser<[string, string]> = literal(metaToken)
  .left(metaToken)
  .comb(literal(ln))
  .left(ln)

// Meta 情報のパーサー
const metaFields: Parser<[string, string][]> = spacing(
  rep(metaCmt.or(metaBlank).or(metaField))
)

export const meta: Parser<Meta> = metaFields.map(fields => {
  const m: Meta = {
    version: Versions.latest,
    date: {},
    player: { sente: '', gote: '' },
    handicap: HandicapKinds.hirate,
    other: new Map<string, string>(),
  }

  for (let [key, value] of fields) {
    if (key === '') continue

    if (key === '開始日時') {
      const d = toDate(value)
      if (d) m.date!.start = d
      else m.other!.set(key, value)
    } else if (key === '終了日時') {
      const d = toDate(value)
      if (d) m.date!.end = d
      else m.other!.set(key, value)
    } else if (key === '棋戦') m.title = value
    else if (key === '先手' || key === '下手') m.player.sente = value
    else if (key === '後手' || key === '上手') m.player.gote = value
    else if (key === '場所') m.place = value
    else if (key === '手合割') m.handicap = value
    else if (key === '持ち時間') {
      const t = totalTime.parse(value)
      m.time = { sente: t!.value, gote: t!.value }
    } else m.other!.set(key, value)
  }
  return m
})

const hypens = rep(s('-'))
const separator: Parser<string> = s('手数')
  .right(hypens)
  .right(s('指手'))
  .right(hypens)
  .right(s('消費時間'))
  .right(hypens)
  .right(ln)
  .fallback('')

// 棋譜コメント
export const comment: Parser<string> = ss('*').right(literal(ln)).left(ln)

const toPoint = ([column, row]: [number, number]) => ({ column, row })

const dest: Parser<Point> = columnParser.comb(rowParser).map(toPoint)
const _same: Parser<string> = s('同　').or(s('同'))
const same: (m: Point) => Parser<Point> = prevDest =>
  _same.map(_ => ({
    row: prevDest.row,
    column: prevDest.column,
  }))

const source: Parser<Point> = ss('(')
  .right(columnParser)
  .comb(rowParser)
  .left(ss(')'))
  .map(toPoint)

// Parser<number> の型を変えている
const timeParser: Parser<number | undefined> = time

const consumeTime: Parser<[number?, number?]> = ss('(')
  .right(timeParser)
  .left(ss('/'))
  .comb(timeParser)
  .left(ss(')'))
  .fallback([undefined, undefined])

export function move(prev: Move): Parser<Move> {
  return noln
    .right(integer)
    .left(noln)
    .comb(dest.or(same(prev.dest)))
    .comb(pieceParser(prev.pos.turn))
    .comb(s('成').fallback(''))
    .comb(source)
    .comb(consumeTime)
    .left(literal(ln))
    .left(ln)
    .map(([[[[[idx, dest], piece], prm], source], [time, timeTotal]]) => {
      const base: {
        source: Point
        dest: Point
        piece: Piece
        prevDest: Point
        promote?: boolean
      } = { source, dest, piece, prevDest: prev.dest }

      if (prm === '成') base.promote = true
      else if (canPromote({ sourceRow: source.row, destRow: dest.row, piece }))
        base.promote = false

      const mprops: (pos: Position) => MoveProps = (pos: Position) => ({
        ...base,
        pos,
      })
      const before: MoveProps = mprops(prev.pos)
      const after: MoveProps = mprops(movePos(before))
      const kifuString: string = genKifuString(before)

      const times: { time?: number; timeTotal?: number } = {}
      if (time) times.time = time
      if (timeTotal) times.timeTotal = timeTotal

      return {
        ...after,
        index: idx,
        str: kifuString,
        ...times,
      }
    })
}

// http://kakinoki.o.oo7.jp/kif_format.html
export const KIF: Parser<Kifu> = Parser(input => {
  const { value: metaValue, next } = meta
    .left(separator.fallback(''))
    .parse(input.replace(/\r/g, ''))!

  let kifu: Kifu = newKifu(metaValue.handicap)
  kifu.meta = metaValue

  let prev: Move = getCurrent(kifu)
  let nextInput: string = next
  while (true) {
    const programComment = cmt.parse(nextInput)
    if (programComment) {
      nextInput = programComment.next
      continue
    }

    const c = comment.parse(nextInput)
    if (c) {
      prev.comment = (prev.comment || '') + c.value + '\n'
      nextInput = c.next
      continue
    }

    const r = move(prev).parse(nextInput)
    if (!r) break
    kifu = pushMove(kifu, r.value)
    prev = r.value
    nextInput = r.next
  }

  return success(kifu, nextInput)
})
