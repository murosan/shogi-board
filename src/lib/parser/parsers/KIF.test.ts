import { move } from '../../../handler/game/position'
import { MoveProps } from '../../../model/events/MoveProps'
import Kifu from '../../../model/kifu/Kifu'
import Meta, { Versions } from '../../../model/kifu/Meta'
import { Move } from '../../../model/kifu/Move'
import {
  hirate,
  hishaOti,
  kyouOti,
} from '../../../model/shogi/InitialPositions'
import {
  Empty,
  Fu0,
  Fu1,
  Gin0,
  Gin1,
  Kaku0,
  Kaku1,
  Kin1,
} from '../../../model/shogi/Piece'
import { Parser, ParseResult, success } from '../parser'
import { cmt, KIF, meta, metaField } from './KIF'

function ParserTest(
  input: string,
  parser: Parser<any>,
  expected: ParseResult<any>
) {
  return () => expect(parser.parse(input)).toEqual(expected)
}

describe('cmt', () => {
  const spec = (input: string, expected: ParseResult<any>) =>
    ParserTest(input, cmt, expected)()

  it('', () => {
    spec('# aaa　a　aa   \n1 ７六歩', success(' aaa　a　aa   ', '1 ７六歩'))
    spec('#\n', success('', ''))
    spec('\n', null)
  })
})

describe('metaField', () => {
  const spec = (input: string, expected: ParseResult<any>) =>
    ParserTest(input, metaField, expected)()

  it('', () => {
    spec('key：value\nnext', success(['key', 'value'], 'next'))
    spec('key：value\n', success(['key', 'value'], ''))
    spec('key：va：lue\nnext', success(['key', 'va：lue'], 'next'))
    spec('：\nnext', success(['', ''], 'next'))
    spec('key：value', null)
    spec('：', null)
    spec('\n', null)
  })
})

describe('meta', () => {
  const spec = (input: string, expected: ParseResult<any>) =>
    ParserTest(input, meta, expected)()

  it('パースできる', () => {
    const input = `
# コメント
対局ID：あいでぃー
開始日時：2020/07/26 19:30
終了日時：2020/07/26 20:00

表題：これは other に入る
棋戦：これは title に入る

戦型：戦型
持ち時間：各1時間
場所：とある将棋センター

# コメント

手合割：角落ち

先手：わたし
後手：おれ


# コメント

ここから残りの棋譜`

    const expected: Meta = {
      version: Versions.latest,
      date: {
        start: new Date('2020/07/26 19:30'),
        end: new Date('2020/07/26 20:00'),
      },
      title: 'これは title に入る',
      handicap: '角落ち',
      place: 'とある将棋センター',
      player: {
        sente: 'わたし',
        gote: 'おれ',
      },
      time: {
        sente: 3600,
        gote: 3600,
      },
      other: new Map<string, string>([
        ['対局ID', 'あいでぃー'],
        ['表題', 'これは other に入る'],
        ['戦型', '戦型'],
      ]),
    }

    spec(input, success(expected, 'ここから残りの棋譜'))
  })

  it('日付のパースに失敗したら other に入る', () => {
    const input = `
開始日時：令和2年7月28日
終了日時：令和2年7月28日
持ち時間：なし
`

    const expected: Meta = {
      version: Versions.latest,
      date: {},
      handicap: '平手',
      player: { sente: '', gote: '' },
      time: { sente: 0, gote: 0 },
      other: new Map<string, string>([
        ['開始日時', '令和2年7月28日'],
        ['終了日時', '令和2年7月28日'],
      ]),
    }

    spec(input, success(expected, ''))
  })
})

describe('KIF', () => {
  const spec = (input: string, expected: ParseResult<any>) =>
    ParserTest(input, KIF, expected)()

  it('基本的なパース', () => {
    const input = `
先手：あああああ
後手：んんんんん
手数----指手---------消費時間--
*初期局面でのコメント
   1 ７六歩(77)                ( 0:30/00:00:30)
            # 変なコメント
   2 ８四歩(83)   ( 0:10/00:00:10) この辺に余計な文字があっても大丈夫にしてる...
*普通のコメント
      \t 3        ２六歩(27)   ( 0:30/00:01:00)
*複数行かつ、空行を含む
*
*コメント
`

    const move0: Move = {
      index: 0,
      str: '開始局面',
      source: { column: -1, row: -1 },
      dest: { column: -1, row: -1 },
      piece: Empty,
      pos: hirate(),
      comment: '初期局面でのコメント\n',
    }

    const moveProps1: MoveProps = {
      source: { column: 6, row: 6 },
      dest: { column: 6, row: 5 },
      prevDest: move0.dest,
      piece: Fu0,
      pos: move0.pos,
    }
    const move1: Move = {
      ...moveProps1,
      index: 1,
      str: '７六歩',
      pos: move(moveProps1),
      time: 30,
      timeTotal: 30,
    }

    const moveProps2: MoveProps = {
      source: { column: 7, row: 2 },
      dest: { column: 7, row: 3 },
      prevDest: move1.dest,
      piece: Fu1,
      pos: move1.pos,
    }
    const move2: Move = {
      ...moveProps2,
      index: 2,
      str: '８四歩',
      pos: move(moveProps2),
      time: 10,
      timeTotal: 10,
      comment: '普通のコメント\n',
    }

    const moveProps3: MoveProps = {
      source: { column: 1, row: 6 },
      dest: { column: 1, row: 5 },
      prevDest: move2.dest,
      piece: Fu0,
      pos: move2.pos,
    }
    const move3: Move = {
      ...moveProps3,
      index: 3,
      str: '２六歩',
      pos: move(moveProps3),
      time: 30,
      timeTotal: 60,
      comment: '複数行かつ、空行を含む\n\nコメント\n',
    }

    const expected: Kifu = {
      meta: {
        version: Versions.latest,
        handicap: '平手',
        date: {},
        player: {
          sente: 'あああああ',
          gote: 'んんんんん',
        },
        other: new Map<string, string>(),
      },
      history: {
        moves: [move0, move1, move2, move3],
        index: 3,
      },
    }

    spec(input, success(expected, ''))
  })

  it('駒落ちなら後手(上手)の手番 + 成の選択', () => {
    const input = `
上手：上手さん
下手：下手さん
手合割：飛車落ち
1 ３四歩(33)
2 ７六歩(77)
3 ３二金(41)
4 ２二角成(88)
5 同銀(31)
`

    const move0: Move = {
      index: 0,
      str: '開始局面',
      source: { column: -1, row: -1 },
      dest: { column: -1, row: -1 },
      piece: Empty,
      pos: hishaOti(),
    }

    const moveProps1: MoveProps = {
      source: { column: 2, row: 2 },
      dest: { column: 2, row: 3 },
      prevDest: move0.dest,
      piece: Fu1,
      pos: move0.pos,
    }
    const move1: Move = {
      ...moveProps1,
      index: 1,
      str: '３四歩',
      pos: move(moveProps1),
    }

    const moveProps2: MoveProps = {
      source: { column: 6, row: 6 },
      dest: { column: 6, row: 5 },
      prevDest: move1.dest,
      piece: Fu0,
      pos: move1.pos,
    }
    const move2: Move = {
      ...moveProps2,
      index: 2,
      str: '７六歩',
      pos: move(moveProps2),
    }

    const moveProps3: MoveProps = {
      source: { column: 3, row: 0 },
      dest: { column: 2, row: 1 },
      prevDest: move2.dest,
      piece: Kin1,
      pos: move2.pos,
    }
    const move3: Move = {
      ...moveProps3,
      index: 3,
      str: '３二金',
      pos: move(moveProps3),
    }

    const moveProps4: MoveProps = {
      source: { column: 7, row: 7 },
      dest: { column: 1, row: 1 },
      prevDest: move3.dest,
      piece: Kaku0,
      pos: move3.pos,
      promote: true,
    }
    const move4: Move = {
      ...moveProps4,
      index: 4,
      str: '２二角成',
      pos: move(moveProps4),
    }

    const moveProps5: MoveProps = {
      source: { column: 2, row: 0 },
      dest: { column: 1, row: 1 },
      prevDest: move4.dest,
      piece: Gin1,
      pos: move4.pos,
    }
    const move5: Move = {
      ...moveProps5,
      index: 5,
      str: '同銀',
      pos: move(moveProps5),
    }

    const expected: Kifu = {
      meta: {
        version: Versions.latest,
        handicap: '飛車落ち',
        date: {},
        player: {
          sente: '下手さん',
          gote: '上手さん',
        },
        other: new Map<string, string>(),
      },
      history: {
        moves: [move0, move1, move2, move3, move4, move5],
        index: 5,
      },
    }

    spec(input, success(expected, ''))
  })

  it('駒落ちなら後手(上手)の手番 + 不成の選択', () => {
    const input = `
上手：上手さん
下手：下手さん
手合割：香落ち
1 ３四歩(33)
2 ７六歩(77)
3 ８八角(22)
4 同　銀(79)
`

    const move0: Move = {
      index: 0,
      str: '開始局面',
      source: { column: -1, row: -1 },
      dest: { column: -1, row: -1 },
      piece: Empty,
      pos: kyouOti(),
    }

    const moveProps1: MoveProps = {
      source: { column: 2, row: 2 },
      dest: { column: 2, row: 3 },
      prevDest: move0.dest,
      piece: Fu1,
      pos: move0.pos,
    }
    const move1: Move = {
      ...moveProps1,
      index: 1,
      str: '３四歩',
      pos: move(moveProps1),
    }

    const moveProps2: MoveProps = {
      source: { column: 6, row: 6 },
      dest: { column: 6, row: 5 },
      prevDest: move1.dest,
      piece: Fu0,
      pos: move1.pos,
    }
    const move2: Move = {
      ...moveProps2,
      index: 2,
      str: '７六歩',
      pos: move(moveProps2),
    }

    const moveProps3: MoveProps = {
      source: { column: 1, row: 1 },
      dest: { column: 7, row: 7 },
      prevDest: move2.dest,
      piece: Kaku1,
      pos: move2.pos,
      promote: false,
    }
    const move3: Move = {
      ...moveProps3,
      index: 3,
      str: '８八角不成',
      pos: move(moveProps3),
    }

    const moveProps4: MoveProps = {
      source: { column: 6, row: 8 },
      dest: { column: 7, row: 7 },
      prevDest: move3.dest,
      piece: Gin0,
      pos: move3.pos,
    }
    const move4: Move = {
      ...moveProps4,
      index: 4,
      str: '同銀',
      pos: move(moveProps4),
    }

    const expected: Kifu = {
      meta: {
        version: Versions.latest,
        handicap: '香落ち',
        date: {},
        player: {
          sente: '下手さん',
          gote: '上手さん',
        },
        other: new Map<string, string>(),
      },
      history: {
        moves: [move0, move1, move2, move3, move4],
        index: 4,
      },
    }

    spec(input, success(expected, ''))
  })

  it('メタ情報なしパターン', () => {
    const input = `
      1 ７六歩(77)
    `

    const move0: Move = {
      index: 0,
      str: '開始局面',
      source: { column: -1, row: -1 },
      dest: { column: -1, row: -1 },
      piece: Empty,
      pos: hirate(),
    }

    const moveProps1: MoveProps = {
      source: { column: 6, row: 6 },
      dest: { column: 6, row: 5 },
      prevDest: move0.dest,
      piece: Fu0,
      pos: move0.pos,
    }
    const move1: Move = {
      ...moveProps1,
      index: 1,
      str: '７六歩',
      pos: move(moveProps1),
    }

    const expected: Kifu = {
      meta: {
        version: Versions.latest,
        handicap: '平手',
        date: {},
        player: { sente: '', gote: '' },
        other: new Map<string, string>(),
      },
      history: {
        moves: [move0, move1],
        index: 1,
      },
    }

    spec(input, success(expected, '    '))
  })
})
