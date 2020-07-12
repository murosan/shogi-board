import { MoveProps } from '../../model/events/MoveProps'
import {
  Fu0,
  Fu1,
  Gin0,
  Gin1,
  Hisha0,
  Kaku0,
  Kaku1,
  Kin0,
  Kin1,
  Piece,
  Ryu0,
  To0,
  Uma0,
  To1,
  Ryu1,
  Uma1,
} from '../../model/shogi/Piece'
import Point from '../../model/shogi/Point'
import { Position } from '../../model/shogi/Position'
import { Gote, Sente, Turn } from '../../model/shogi/Turn'
import { emptyPosition } from '../../testutils/emptyPosition'
import { genKifString } from './genKifString'

interface TestProps {
  source: Point
  dest: Point
  prevDest?: Point
  setups: Point[]
  turn?: Turn
  piece: Piece
  promote?: boolean
  expected: string
}

class TestRunner {
  nexts: TestRunner[] = []

  test() {}

  callback() {
    return () => {
      this.test()
      this.nexts.forEach(n => n.test())
    }
  }

  andThen(next: TestRunner): TestRunner {
    this.nexts.push(next)
    return this
  }
}

class Setup extends TestRunner {
  position: Position = emptyPosition()

  turn: Turn
  source: Point
  dest: Point
  prevDest: Point | null
  setups: Point[]

  expected: string
  piece: Piece
  promote: boolean | undefined

  constructor({
    source,
    dest,
    prevDest,
    setups,
    turn,
    piece,
    promote,
    expected,
  }: TestProps) {
    super()
    this.source = source
    this.dest = dest
    this.prevDest = prevDest || null
    this.setups = setups
    this.turn = turn || Sente
    this.expected = expected
    this.piece = piece
    this.promote = promote
  }

  setup() {
    this.position.turn = this.turn
    this.setups.forEach(
      ({ row, column, piece }) => (this.position.pos[row][column] = piece!)
    )
  }

  test() {
    this.setup()

    const p: MoveProps = {
      pos: this.position,
      source: this.source,
      dest: this.dest,
      prevDest: this.prevDest || undefined,
      piece: this.piece,
      promote: this.promote,
    }
    expect(genKifString(p)).toBe(this.expected)
  }
}

it(
  '棋譜を生成できる',
  new Setup({
    setups: [{ column: 1, row: 6, piece: Fu0 }],
    source: { column: 1, row: 6 },
    dest: { column: 1, row: 5 },
    piece: Fu0,
    expected: '２六歩',
  })
    .andThen(
      new Setup({
        setups: [{ column: 2, row: 2, piece: Fu1 }],
        source: { column: 2, row: 2 },
        dest: { column: 2, row: 3 },
        piece: Fu1,
        expected: '３四歩',
        turn: Gote,
      })
    )
    .callback()
)

it(
  '持ち駒を打つ場合も生成できる',
  new Setup({
    setups: [],
    source: { column: -1, row: -1 },
    dest: { column: 4, row: 4 },
    piece: Kin0,
    expected: '５五金',
  }).callback()
)

it(
  '持ち駒を打つ場合、他にそのマスに移動できる駒があれば`打`をつける',
  new Setup({
    setups: [{ column: 4, row: 5, piece: Kin0 }],
    source: { column: -1, row: -1 },
    dest: { column: 4, row: 4 },
    piece: Kin0,
    expected: '５五金打',
  }).callback()
)

it(
  '`成`をつけられる',
  new Setup({
    setups: [{ column: 7, row: 7, piece: Kaku0 }],
    source: { column: 7, row: 7 },
    dest: { column: 1, row: 1 },
    piece: Kaku0,
    expected: '２二角成',
    promote: true,
  })
    .andThen(
      new Setup({
        setups: [{ column: 1, row: 1, piece: Kaku1 }],
        source: { column: 1, row: 1 },
        dest: { column: 7, row: 7 },
        piece: Kaku1,
        expected: '８八角成',
        promote: true,
        turn: Gote,
      })
    )
    .callback()
)

it(
  '`不成`をつけられる',
  new Setup({
    setups: [{ column: 1, row: 2, piece: Gin0 }],
    source: { column: 1, row: 2 },
    dest: { column: 1, row: 1 },
    piece: Gin0,
    expected: '２二銀不成',
    promote: false,
  })
    .andThen(
      new Setup({
        setups: [{ column: 7, row: 5, piece: Gin1 }],
        source: { column: 7, row: 5 },
        dest: { column: 7, row: 6 },
        piece: Gin1,
        expected: '８七銀不成',
        promote: false,
        turn: Gote,
      })
    )
    .callback()
)

it(
  '成れない場合は`成`も`不成`もつかない',
  new Setup({
    setups: [{ column: 1, row: 2, piece: Kin0 }],
    source: { column: 1, row: 2 },
    dest: { column: 1, row: 1 },
    piece: Kin0,
    expected: '２二金',
  })
    .andThen(
      new Setup({
        setups: [{ column: 4, row: 5, piece: Kin1 }],
        source: { column: 4, row: 5 },
        dest: { column: 4, row: 6 },
        piece: Kin1,
        expected: '５七金',
        turn: Gote,
      })
    )
    .callback()
)

it(
  '前回と同じ位置に移動する場合`同`で表記する',
  new Setup({
    setups: [{ column: 1, row: 3, piece: Fu1 }],
    source: { column: 1, row: 7 },
    dest: { column: 1, row: 3 },
    prevDest: { column: 1, row: 3 },
    piece: Hisha0,
    expected: '同飛',
  })
    .andThen(
      new Setup({
        setups: [
          { column: 1, row: 1, piece: Uma0 },
          { column: 2, row: 0, piece: Gin1 },
        ],
        source: { column: 2, row: 0 },
        dest: { column: 1, row: 1 },
        prevDest: { column: 1, row: 1 },
        piece: Gin1,
        turn: Gote,
        expected: '同銀',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 6, row: 6, piece: Kaku0 },
          { column: 2, row: 2, piece: Kaku1 },
        ],
        source: { column: 6, row: 6 },
        dest: { column: 2, row: 2 },
        prevDest: { column: 2, row: 2 },
        piece: Kaku0,
        promote: true,
        expected: '同角成',
      })
    )
    .callback()
)

it(
  '前回と違う行、または列だったら `同` はつかない',
  new Setup({
    setups: [{ column: 1, row: 3, piece: Fu1 }],
    source: { column: 1, row: 7 },
    dest: { column: 1, row: 3 },
    prevDest: { column: 1, row: 1 },
    piece: Hisha0,
    expected: '２四飛',
  })
    .andThen(
      new Setup({
        setups: [
          { column: 1, row: 1, piece: Uma0 },
          { column: 2, row: 0, piece: Gin1 },
        ],
        source: { column: 2, row: 0 },
        dest: { column: 1, row: 1 },
        prevDest: { column: 4, row: 1 },
        piece: Gin1,
        expected: '２二銀',
      })
    )
    .callback()
)

// https://www.shogi.or.jp/faq/kihuhyouki.html
// ↑ のページにあるパターンは全てテストする
//   加えて、足りないと思われるものや、後手番の場合もテストする

it(
  '到達地点に複数の同じ駒が動ける場合、「上」または「寄」または「引」を記入する',
  new Setup({
    setups: [
      { column: 8, row: 2, piece: Kin0 },
      { column: 6, row: 1, piece: Kin0 },
    ],
    source: { column: 8, row: 2 },
    dest: { column: 7, row: 1 },
    piece: Kin0,
    expected: '８二金上',
  })
    .andThen(
      new Setup({
        setups: [
          { column: 8, row: 2, piece: Kin0 },
          { column: 6, row: 1, piece: Kin0 },
        ],
        source: { column: 6, row: 1 },
        dest: { column: 7, row: 1 },
        piece: Kin0,
        expected: '８二金寄',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 0, row: 6, piece: Kin1 },
          { column: 2, row: 7, piece: Kin1 },
        ],
        source: { column: 0, row: 6 },
        dest: { column: 1, row: 7 },
        piece: Kin1,
        expected: '２八金上',
        turn: Gote,
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 0, row: 6, piece: Kin1 },
          { column: 2, row: 7, piece: Kin1 },
        ],
        source: { column: 2, row: 7 },
        dest: { column: 1, row: 7 },
        piece: Kin1,
        expected: '２八金寄',
        turn: Gote,
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 2, row: 0, piece: Kin0 },
          { column: 3, row: 2, piece: Kin0 },
        ],
        source: { column: 3, row: 2 },
        dest: { column: 2, row: 1 },
        piece: Kin0,
        expected: '３二金上',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 2, row: 0, piece: Kin0 },
          { column: 3, row: 2, piece: Kin0 },
        ],
        source: { column: 2, row: 0 },
        dest: { column: 2, row: 1 },
        piece: Kin0,
        expected: '３二金引',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 6, row: 8, piece: Kin1 },
          { column: 5, row: 6, piece: Kin1 },
        ],
        source: { column: 5, row: 6 },
        dest: { column: 6, row: 7 },
        piece: Kin1,
        expected: '７八金上',
        turn: Gote,
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 6, row: 8, piece: Kin1 },
          { column: 5, row: 6, piece: Kin1 },
        ],
        source: { column: 6, row: 8 },
        dest: { column: 6, row: 7 },
        piece: Kin1,
        expected: '７八金引',
        turn: Gote,
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 4, row: 5, piece: Kin0 },
          { column: 3, row: 4, piece: Kin0 },
        ],
        source: { column: 4, row: 5 },
        dest: { column: 4, row: 4 },
        piece: Kin0,
        expected: '５五金上',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 4, row: 5, piece: Kin0 },
          { column: 3, row: 4, piece: Kin0 },
        ],
        source: { column: 3, row: 4 },
        dest: { column: 4, row: 4 },
        piece: Kin0,
        expected: '５五金寄',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 4, row: 3, piece: Kin1 },
          { column: 5, row: 4, piece: Kin1 },
        ],
        source: { column: 4, row: 3 },
        dest: { column: 4, row: 4 },
        piece: Kin1,
        expected: '５五金上',
        turn: Gote,
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 4, row: 3, piece: Kin1 },
          { column: 5, row: 4, piece: Kin1 },
        ],
        source: { column: 5, row: 4 },
        dest: { column: 4, row: 4 },
        piece: Kin1,
        expected: '５五金寄',
        turn: Gote,
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 7, row: 8, piece: Gin0 },
          { column: 6, row: 6, piece: Gin0 },
        ],
        source: { column: 7, row: 8 },
        dest: { column: 7, row: 7 },
        piece: Gin0,
        expected: '８八銀上',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 7, row: 8, piece: Gin0 },
          { column: 6, row: 6, piece: Gin0 },
        ],
        source: { column: 6, row: 6 },
        dest: { column: 7, row: 7 },
        piece: Gin0,
        expected: '８八銀引',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 1, row: 0, piece: Gin1 },
          { column: 2, row: 2, piece: Gin1 },
        ],
        source: { column: 1, row: 0 },
        dest: { column: 1, row: 1 },
        piece: Gin1,
        expected: '２二銀上',
        turn: Gote,
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 1, row: 0, piece: Gin1 },
          { column: 2, row: 2, piece: Gin1 },
        ],
        source: { column: 2, row: 2 },
        dest: { column: 1, row: 1 },
        piece: Gin1,
        expected: '２二銀引',
        turn: Gote,
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 3, row: 8, piece: Gin0 },
          { column: 1, row: 6, piece: Gin0 },
        ],
        source: { column: 3, row: 8 },
        dest: { column: 2, row: 7 },
        piece: Gin0,
        expected: '３八銀上',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 3, row: 8, piece: Gin0 },
          { column: 1, row: 6, piece: Gin0 },
        ],
        source: { column: 1, row: 6 },
        dest: { column: 2, row: 7 },
        piece: Gin0,
        expected: '３八銀引',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 5, row: 0, piece: Gin1 },
          { column: 7, row: 2, piece: Gin1 },
        ],
        source: { column: 5, row: 0 },
        dest: { column: 6, row: 1 },
        piece: Gin1,
        expected: '７二銀上',
        turn: Gote,
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 5, row: 0, piece: Gin1 },
          { column: 7, row: 2, piece: Gin1 },
        ],
        source: { column: 7, row: 2 },
        dest: { column: 6, row: 1 },
        piece: Gin1,
        expected: '７二銀引',
        turn: Gote,
      })
    )
    .callback()
)

it(
  '到達地点に2枚の同じ駒が動ける場合、動作でどの駒が動いたかわからない時は、「左」「右」を記入する',
  new Setup({
    setups: [
      { column: 8, row: 1, piece: Kin0 },
      { column: 6, row: 1, piece: Kin0 },
    ],
    source: { column: 8, row: 1 },
    dest: { column: 7, row: 0 },
    piece: Kin0,
    expected: '８一金左',
  })
    .andThen(
      new Setup({
        setups: [
          { column: 8, row: 1, piece: Kin0 },
          { column: 6, row: 1, piece: Kin0 },
        ],
        source: { column: 6, row: 1 },
        dest: { column: 7, row: 0 },
        piece: Kin0,
        expected: '８一金右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 0, row: 7, piece: Kin1 },
          { column: 2, row: 7, piece: Kin1 },
        ],
        source: { column: 0, row: 7 },
        dest: { column: 1, row: 8 },
        piece: Kin1,
        turn: Gote,
        expected: '２九金左',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 0, row: 7, piece: Kin1 },
          { column: 2, row: 7, piece: Kin1 },
        ],
        source: { column: 2, row: 7 },
        dest: { column: 1, row: 8 },
        piece: Kin1,
        turn: Gote,
        expected: '２九金右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 2, row: 1, piece: Kin0 },
          { column: 0, row: 1, piece: Kin0 },
        ],
        source: { column: 2, row: 1 },
        dest: { column: 1, row: 1 },
        piece: Kin0,
        expected: '２二金左',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 2, row: 1, piece: Kin0 },
          { column: 0, row: 1, piece: Kin0 },
        ],
        source: { column: 0, row: 1 },
        dest: { column: 1, row: 1 },
        piece: Kin0,
        expected: '２二金右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 6, row: 7, piece: Kin1 },
          { column: 8, row: 7, piece: Kin1 },
        ],
        source: { column: 6, row: 7 },
        dest: { column: 7, row: 7 },
        piece: Kin1,
        turn: Gote,
        expected: '８八金左',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 6, row: 7, piece: Kin1 },
          { column: 8, row: 7, piece: Kin1 },
        ],
        source: { column: 8, row: 7 },
        dest: { column: 7, row: 7 },
        piece: Kin1,
        turn: Gote,
        expected: '８八金右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 5, row: 4, piece: Gin0 },
          { column: 3, row: 4, piece: Gin0 },
        ],
        source: { column: 5, row: 4 },
        dest: { column: 4, row: 5 },
        piece: Gin0,
        expected: '５六銀左',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 5, row: 4, piece: Gin0 },
          { column: 3, row: 4, piece: Gin0 },
        ],
        source: { column: 3, row: 4 },
        dest: { column: 4, row: 5 },
        piece: Gin0,
        expected: '５六銀右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 3, row: 4, piece: Gin1 },
          { column: 5, row: 4, piece: Gin1 },
        ],
        source: { column: 3, row: 4 },
        dest: { column: 4, row: 3 },
        piece: Gin1,
        turn: Gote,
        expected: '５四銀左',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 3, row: 4, piece: Gin1 },
          { column: 5, row: 4, piece: Gin1 },
        ],
        source: { column: 5, row: 4 },
        dest: { column: 4, row: 3 },
        piece: Gin1,
        turn: Gote,
        expected: '５四銀右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 7, row: 8, piece: Kin0 },
          { column: 6, row: 8, piece: Kin0 },
        ],
        source: { column: 7, row: 8 },
        dest: { column: 6, row: 7 },
        piece: Kin0,
        expected: '７八金左',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 7, row: 8, piece: Kin0 },
          { column: 6, row: 8, piece: Kin0 },
        ],
        source: { column: 6, row: 8 },
        dest: { column: 6, row: 7 },
        piece: Kin0,
        expected: '７八金直',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 1, row: 0, piece: Kin1 },
          { column: 2, row: 0, piece: Kin1 },
        ],
        source: { column: 1, row: 0 },
        dest: { column: 2, row: 1 },
        piece: Kin1,
        turn: Gote,
        expected: '３二金左',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 1, row: 0, piece: Kin1 },
          { column: 2, row: 0, piece: Kin1 },
        ],
        source: { column: 2, row: 0 },
        dest: { column: 2, row: 1 },
        piece: Kin1,
        turn: Gote,
        expected: '３二金直',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 2, row: 8, piece: Gin0 },
          { column: 1, row: 8, piece: Gin0 },
        ],
        source: { column: 2, row: 8 },
        dest: { column: 2, row: 7 },
        piece: Gin0,
        expected: '３八銀直',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 2, row: 8, piece: Gin0 },
          { column: 1, row: 8, piece: Gin0 },
        ],
        source: { column: 1, row: 8 },
        dest: { column: 2, row: 7 },
        piece: Gin0,
        expected: '３八銀右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 6, row: 0, piece: Gin1 },
          { column: 7, row: 0, piece: Gin1 },
        ],
        source: { column: 6, row: 0 },
        dest: { column: 6, row: 1 },
        piece: Gin1,
        turn: Gote,
        expected: '７二銀直',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 6, row: 0, piece: Gin1 },
          { column: 7, row: 0, piece: Gin1 },
        ],
        source: { column: 7, row: 0 },
        dest: { column: 6, row: 1 },
        piece: Gin1,
        turn: Gote,
        expected: '７二銀右',
      })
    )
    .callback()
)

it(
  '到達地点に3枚以上の同じ駒が動ける場合、動作でどの駒が動いたかわからない時',
  new Setup({
    setups: [
      { column: 5, row: 2, piece: Kin0 },
      { column: 4, row: 2, piece: Kin0 },
      { column: 3, row: 2, piece: Kin0 },
      { column: 3, row: 1, piece: To0 }, // 違う駒を紛れ込ませてみる
    ],
    source: { column: 5, row: 2 },
    dest: { column: 4, row: 1 },
    piece: Kin0,
    expected: '５二金左',
  })
    .andThen(
      new Setup({
        setups: [
          { column: 5, row: 2, piece: Kin0 },
          { column: 4, row: 2, piece: Kin0 },
          { column: 3, row: 2, piece: Kin0 },
        ],
        source: { column: 4, row: 2 },
        dest: { column: 4, row: 1 },
        piece: Kin0,
        expected: '５二金直',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 5, row: 2, piece: Kin0 },
          { column: 4, row: 2, piece: Kin0 },
          { column: 3, row: 2, piece: Kin0 },
        ],
        source: { column: 3, row: 2 },
        dest: { column: 4, row: 1 },
        piece: Kin0,
        expected: '５二金右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 3, row: 6, piece: Kin1 },
          { column: 4, row: 6, piece: Kin1 },
          { column: 5, row: 6, piece: Kin1 },
        ],
        source: { column: 3, row: 6 },
        dest: { column: 4, row: 7 },
        piece: Kin1,
        turn: Gote,
        expected: '５八金左',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 3, row: 6, piece: Kin1 },
          { column: 4, row: 6, piece: Kin1 },
          { column: 5, row: 6, piece: Kin1 },
        ],
        source: { column: 4, row: 6 },
        dest: { column: 4, row: 7 },
        piece: Kin1,
        turn: Gote,
        expected: '５八金直',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 3, row: 6, piece: Kin1 },
          { column: 4, row: 6, piece: Kin1 },
          { column: 5, row: 6, piece: Kin1 },
        ],
        source: { column: 5, row: 6 },
        dest: { column: 4, row: 7 },
        piece: Kin1,
        turn: Gote,
        expected: '５八金右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 6, row: 8, piece: To0 },
          { column: 7, row: 8, piece: To0 },
          { column: 8, row: 8, piece: To0 },
          { column: 8, row: 7, piece: To0 },
          { column: 7, row: 6, piece: To0 },
        ],
        source: { column: 6, row: 8 },
        dest: { column: 7, row: 7 },
        piece: To0,
        expected: '８八と右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 6, row: 8, piece: To0 },
          { column: 7, row: 8, piece: To0 },
          { column: 8, row: 8, piece: To0 },
          { column: 8, row: 7, piece: To0 },
          { column: 7, row: 6, piece: To0 },
        ],
        source: { column: 7, row: 8 },
        dest: { column: 7, row: 7 },
        piece: To0,
        expected: '８八と直',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 6, row: 8, piece: To0 },
          { column: 7, row: 8, piece: To0 },
          { column: 8, row: 8, piece: To0 },
          { column: 8, row: 7, piece: To0 },
          { column: 7, row: 6, piece: To0 },
        ],
        source: { column: 8, row: 8 },
        dest: { column: 7, row: 7 },
        piece: To0,
        expected: '８八と左上',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 6, row: 8, piece: To0 },
          { column: 7, row: 8, piece: To0 },
          { column: 8, row: 8, piece: To0 },
          { column: 8, row: 7, piece: To0 },
          { column: 7, row: 6, piece: To0 },
        ],
        source: { column: 8, row: 7 },
        dest: { column: 7, row: 7 },
        piece: To0,
        expected: '８八と寄',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 6, row: 8, piece: To0 },
          { column: 7, row: 8, piece: To0 },
          { column: 8, row: 8, piece: To0 },
          { column: 8, row: 7, piece: To0 },
          { column: 7, row: 6, piece: To0 },
        ],
        source: { column: 7, row: 6 },
        dest: { column: 7, row: 7 },
        piece: To0,
        expected: '８八と引',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 2, row: 0, piece: To1 },
          { column: 1, row: 0, piece: To1 },
          { column: 0, row: 0, piece: To1 },
          { column: 0, row: 1, piece: To1 },
          { column: 1, row: 2, piece: To1 },
        ],
        source: { column: 2, row: 0 },
        dest: { column: 1, row: 1 },
        piece: To1,
        turn: Gote,
        expected: '２二と右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 2, row: 0, piece: To1 },
          { column: 1, row: 0, piece: To1 },
          { column: 0, row: 0, piece: To1 },
          { column: 0, row: 1, piece: To1 },
          { column: 1, row: 2, piece: To1 },
        ],
        source: { column: 1, row: 0 },
        dest: { column: 1, row: 1 },
        piece: To1,
        turn: Gote,
        expected: '２二と直',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 2, row: 0, piece: To1 },
          { column: 1, row: 0, piece: To1 },
          { column: 0, row: 0, piece: To1 },
          { column: 0, row: 1, piece: To1 },
          { column: 1, row: 2, piece: To1 },
        ],
        source: { column: 0, row: 0 },
        dest: { column: 1, row: 1 },
        piece: To1,
        turn: Gote,
        expected: '２二と左上',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 2, row: 0, piece: To1 },
          { column: 1, row: 0, piece: To1 },
          { column: 0, row: 0, piece: To1 },
          { column: 0, row: 1, piece: To1 },
          { column: 1, row: 2, piece: To1 },
        ],
        source: { column: 0, row: 1 },
        dest: { column: 1, row: 1 },
        piece: To1,
        turn: Gote,
        expected: '２二と寄',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 2, row: 0, piece: To1 },
          { column: 1, row: 0, piece: To1 },
          { column: 0, row: 0, piece: To1 },
          { column: 0, row: 1, piece: To1 },
          { column: 1, row: 2, piece: To1 },
        ],
        source: { column: 1, row: 2 },
        dest: { column: 1, row: 1 },
        piece: To1,
        turn: Gote,
        expected: '２二と引',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 6, row: 8, piece: To0 },
          { column: 7, row: 8, piece: To0 },
          { column: 8, row: 8, piece: To0 },
          { column: 8, row: 7, piece: To0 },
          { column: 7, row: 6, piece: To0 },
          { column: 6, row: 7, piece: To0 },
        ],
        source: { column: 8, row: 7 },
        dest: { column: 7, row: 7 },
        piece: To0,
        expected: '８八と左寄',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 6, row: 8, piece: To0 },
          { column: 7, row: 8, piece: To0 },
          { column: 8, row: 8, piece: To0 },
          { column: 8, row: 7, piece: To0 },
          { column: 7, row: 6, piece: To0 },
          { column: 6, row: 7, piece: To0 },
        ],
        source: { column: 6, row: 7 },
        dest: { column: 7, row: 7 },
        piece: To0,
        expected: '８八と右寄',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 2, row: 0, piece: To1 },
          { column: 1, row: 0, piece: To1 },
          { column: 0, row: 0, piece: To1 },
          { column: 0, row: 1, piece: To1 },
          { column: 1, row: 2, piece: To1 },
          { column: 2, row: 1, piece: To1 },
        ],
        source: { column: 0, row: 1 },
        dest: { column: 1, row: 1 },
        piece: To1,
        turn: Gote,
        expected: '２二と左寄',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 2, row: 0, piece: To1 },
          { column: 1, row: 0, piece: To1 },
          { column: 0, row: 0, piece: To1 },
          { column: 0, row: 1, piece: To1 },
          { column: 1, row: 2, piece: To1 },
          { column: 2, row: 1, piece: To1 },
        ],
        source: { column: 2, row: 1 },
        dest: { column: 1, row: 1 },
        piece: To1,
        turn: Gote,
        expected: '２二と右寄',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 1, row: 8, piece: Gin0 },
          { column: 0, row: 6, piece: Gin0 },
          { column: 2, row: 8, piece: Gin0 },
          { column: 2, row: 6, piece: Gin0 },
        ],
        source: { column: 1, row: 8 },
        dest: { column: 1, row: 7 },
        piece: Gin0,
        expected: '２八銀直',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 1, row: 8, piece: Gin0 },
          { column: 0, row: 6, piece: Gin0 },
          { column: 2, row: 8, piece: Gin0 },
          { column: 2, row: 6, piece: Gin0 },
        ],
        source: { column: 0, row: 6 },
        dest: { column: 1, row: 7 },
        piece: Gin0,
        expected: '２八銀右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 1, row: 8, piece: Gin0 },
          { column: 0, row: 6, piece: Gin0 },
          { column: 2, row: 8, piece: Gin0 },
          { column: 2, row: 6, piece: Gin0 },
        ],
        source: { column: 2, row: 8 },
        dest: { column: 1, row: 7 },
        piece: Gin0,
        expected: '２八銀左上',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 1, row: 8, piece: Gin0 },
          { column: 0, row: 6, piece: Gin0 },
          { column: 2, row: 8, piece: Gin0 },
          { column: 2, row: 6, piece: Gin0 },
        ],
        source: { column: 2, row: 6 },
        dest: { column: 1, row: 7 },
        piece: Gin0,
        expected: '２八銀左引',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 7, row: 0, piece: Gin1 },
          { column: 6, row: 0, piece: Gin1 },
          { column: 6, row: 2, piece: Gin1 },
          { column: 8, row: 2, piece: Gin1 },
        ],
        source: { column: 7, row: 0 },
        dest: { column: 7, row: 1 },
        piece: Gin1,
        turn: Gote,
        expected: '８二銀直',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 7, row: 0, piece: Gin1 },
          { column: 6, row: 0, piece: Gin1 },
          { column: 6, row: 2, piece: Gin1 },
          { column: 8, row: 2, piece: Gin1 },
        ],
        source: { column: 6, row: 0 },
        dest: { column: 7, row: 1 },
        piece: Gin1,
        turn: Gote,
        expected: '８二銀左上',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 7, row: 0, piece: Gin1 },
          { column: 6, row: 0, piece: Gin1 },
          { column: 6, row: 2, piece: Gin1 },
          { column: 8, row: 2, piece: Gin1 },
        ],
        source: { column: 6, row: 2 },
        dest: { column: 7, row: 1 },
        piece: Gin1,
        turn: Gote,
        expected: '８二銀左引',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 7, row: 0, piece: Gin1 },
          { column: 6, row: 0, piece: Gin1 },
          { column: 6, row: 2, piece: Gin1 },
          { column: 8, row: 2, piece: Gin1 },
        ],
        source: { column: 8, row: 2 },
        dest: { column: 7, row: 1 },
        piece: Gin1,
        turn: Gote,
        expected: '８二銀右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 0, row: 0, piece: Gin0 },
          { column: 0, row: 2, piece: Gin0 },
          { column: 2, row: 2, piece: Gin0 },
          { column: 2, row: 0, piece: Gin0 },
        ],
        source: { column: 0, row: 0 },
        dest: { column: 1, row: 1 },
        piece: Gin0,
        promote: false,
        expected: '２二銀右引不成',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 0, row: 0, piece: Gin0 },
          { column: 0, row: 2, piece: Gin0 },
          { column: 2, row: 2, piece: Gin0 },
          { column: 2, row: 0, piece: Gin0 },
        ],
        source: { column: 0, row: 2 },
        dest: { column: 1, row: 1 },
        piece: Gin0,
        promote: true,
        expected: '２二銀右上成',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 8, row: 8, piece: Gin1 },
          { column: 8, row: 6, piece: Gin1 },
          { column: 6, row: 6, piece: Gin1 },
          { column: 6, row: 8, piece: Gin1 },
        ],
        source: { column: 8, row: 8 },
        dest: { column: 7, row: 7 },
        piece: Gin1,
        promote: false,
        turn: Gote,
        expected: '８八銀右引不成',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 8, row: 8, piece: Gin1 },
          { column: 8, row: 6, piece: Gin1 },
          { column: 6, row: 6, piece: Gin1 },
          { column: 6, row: 8, piece: Gin1 },
        ],
        source: { column: 6, row: 6 },
        dest: { column: 7, row: 7 },
        piece: Gin1,
        promote: true,
        turn: Gote,
        expected: '８八銀左上成',
      })
    )
    .callback()
)

it(
  '竜が2枚の場合は動作を優先する。ただし「直」は使わずに「左」「右」で記入する',
  new Setup({
    setups: [
      { column: 8, row: 0, piece: Ryu0 },
      { column: 7, row: 3, piece: Ryu0 },
    ],
    source: { column: 8, row: 0 },
    dest: { column: 7, row: 1 },
    piece: Ryu0,
    expected: '８二龍引',
  })
    .andThen(
      new Setup({
        setups: [
          { column: 8, row: 0, piece: Ryu0 },
          { column: 7, row: 3, piece: Ryu0 },
        ],
        source: { column: 7, row: 3 },
        dest: { column: 7, row: 1 },
        piece: Ryu0,
        expected: '８二龍上',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 0, row: 8, piece: Ryu1 },
          { column: 1, row: 5, piece: Ryu1 },
        ],
        source: { column: 0, row: 8 },
        dest: { column: 1, row: 7 },
        piece: Ryu1,
        turn: Gote,
        expected: '２八龍引',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 0, row: 8, piece: Ryu1 },
          { column: 1, row: 5, piece: Ryu1 },
        ],
        source: { column: 1, row: 5 },
        dest: { column: 1, row: 7 },
        piece: Ryu1,
        turn: Gote,
        expected: '２八龍上',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 1, row: 2, piece: Ryu0 },
          { column: 4, row: 1, piece: Ryu0 },
        ],
        source: { column: 1, row: 2 },
        dest: { column: 3, row: 2 },
        piece: Ryu0,
        expected: '４三龍寄',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 1, row: 2, piece: Ryu0 },
          { column: 4, row: 1, piece: Ryu0 },
        ],
        source: { column: 4, row: 1 },
        dest: { column: 3, row: 2 },
        piece: Ryu0,
        expected: '４三龍引',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 7, row: 6, piece: Ryu1 },
          { column: 4, row: 7, piece: Ryu1 },
        ],
        source: { column: 7, row: 6 },
        dest: { column: 5, row: 6 },
        piece: Ryu1,
        turn: Gote,
        expected: '６七龍寄',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 7, row: 6, piece: Ryu1 },
          { column: 4, row: 7, piece: Ryu1 },
        ],
        source: { column: 4, row: 7 },
        dest: { column: 5, row: 6 },
        piece: Ryu1,
        turn: Gote,
        expected: '６七龍引',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 4, row: 4, piece: Ryu0 },
          { column: 0, row: 4, piece: Ryu0 },
        ],
        source: { column: 4, row: 4 },
        dest: { column: 2, row: 4 },
        piece: Ryu0,
        expected: '３五龍左',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 4, row: 4, piece: Ryu0 },
          { column: 0, row: 4, piece: Ryu0 },
        ],
        source: { column: 0, row: 4 },
        dest: { column: 2, row: 4 },
        piece: Ryu0,
        expected: '３五龍右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 4, row: 4, piece: Ryu1 },
          { column: 8, row: 4, piece: Ryu1 },
        ],
        source: { column: 4, row: 4 },
        dest: { column: 6, row: 4 },
        piece: Ryu1,
        turn: Gote,
        expected: '７五龍左',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 4, row: 4, piece: Ryu1 },
          { column: 8, row: 4, piece: Ryu1 },
        ],
        source: { column: 8, row: 4 },
        dest: { column: 6, row: 4 },
        piece: Ryu1,
        turn: Gote,
        expected: '７五龍右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 8, row: 8, piece: Ryu0 },
          { column: 7, row: 8, piece: Ryu0 },
        ],
        source: { column: 8, row: 8 },
        dest: { column: 7, row: 7 },
        piece: Ryu0,
        expected: '８八龍左',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 8, row: 8, piece: Ryu0 },
          { column: 7, row: 8, piece: Ryu0 },
        ],
        source: { column: 7, row: 8 },
        dest: { column: 7, row: 7 },
        piece: Ryu0,
        expected: '８八龍右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 0, row: 0, piece: Ryu1 },
          { column: 1, row: 0, piece: Ryu1 },
        ],
        source: { column: 0, row: 0 },
        dest: { column: 1, row: 1 },
        piece: Ryu1,
        turn: Gote,
        expected: '２二龍左',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 0, row: 0, piece: Ryu1 },
          { column: 1, row: 0, piece: Ryu1 },
        ],
        source: { column: 1, row: 0 },
        dest: { column: 1, row: 1 },
        piece: Ryu1,
        turn: Gote,
        expected: '２二龍右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 1, row: 7, piece: Ryu0 },
          { column: 0, row: 8, piece: Ryu0 },
        ],
        source: { column: 1, row: 7 },
        dest: { column: 0, row: 6 },
        piece: Ryu0,
        expected: '１七龍左',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 1, row: 7, piece: Ryu0 },
          { column: 0, row: 8, piece: Ryu0 },
        ],
        source: { column: 0, row: 8 },
        dest: { column: 0, row: 6 },
        piece: Ryu0,
        expected: '１七龍右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 7, row: 1, piece: Ryu1 },
          { column: 8, row: 0, piece: Ryu1 },
        ],
        source: { column: 7, row: 1 },
        dest: { column: 8, row: 2 },
        piece: Ryu1,
        turn: Gote,
        expected: '９三龍左',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 7, row: 1, piece: Ryu1 },
          { column: 8, row: 0, piece: Ryu1 },
        ],
        source: { column: 8, row: 0 },
        dest: { column: 8, row: 2 },
        piece: Ryu1,
        turn: Gote,
        expected: '９三龍右',
      })
    )
    .callback()
)

it(
  '馬が2枚の場合は動作を優先する。ただし「直」は使わずに「左」「右」で記入する',
  new Setup({
    setups: [
      { column: 8, row: 0, piece: Uma0 },
      { column: 7, row: 0, piece: Uma0 },
    ],
    source: { column: 8, row: 0 },
    dest: { column: 7, row: 1 },
    piece: Uma0,
    expected: '８二馬左',
  })
    .andThen(
      new Setup({
        setups: [
          { column: 8, row: 0, piece: Uma0 },
          { column: 7, row: 0, piece: Uma0 },
        ],
        source: { column: 7, row: 0 },
        dest: { column: 7, row: 1 },
        piece: Uma0,
        expected: '８二馬右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 1, row: 8, piece: Uma1 },
          { column: 0, row: 8, piece: Uma1 },
        ],
        source: { column: 1, row: 8 },
        dest: { column: 1, row: 7 },
        piece: Uma1,
        turn: Gote,
        expected: '２八馬右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 1, row: 8, piece: Uma1 },
          { column: 0, row: 8, piece: Uma1 },
        ],
        source: { column: 0, row: 8 },
        dest: { column: 1, row: 7 },
        piece: Uma1,
        turn: Gote,
        expected: '２八馬左',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 8, row: 4, piece: Uma0 },
          { column: 5, row: 2, piece: Uma0 },
        ],
        source: { column: 8, row: 4 },
        dest: { column: 7, row: 4 },
        piece: Uma0,
        expected: '８五馬寄',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 8, row: 4, piece: Uma0 },
          { column: 5, row: 2, piece: Uma0 },
        ],
        source: { column: 5, row: 2 },
        dest: { column: 7, row: 4 },
        piece: Uma0,
        expected: '８五馬引',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 3, row: 6, piece: Uma1 },
          { column: 0, row: 4, piece: Uma1 },
        ],
        source: { column: 3, row: 6 },
        dest: { column: 1, row: 4 },
        piece: Uma1,
        turn: Gote,
        expected: '２五馬引',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 3, row: 6, piece: Uma1 },
          { column: 0, row: 4, piece: Uma1 },
        ],
        source: { column: 0, row: 4 },
        dest: { column: 1, row: 4 },
        piece: Uma1,
        turn: Gote,
        expected: '２五馬寄',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 0, row: 0, piece: Uma0 },
          { column: 2, row: 3, piece: Uma0 },
        ],
        source: { column: 0, row: 0 },
        dest: { column: 0, row: 1 },
        piece: Uma0,
        expected: '１二馬引',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 0, row: 0, piece: Uma0 },
          { column: 2, row: 3, piece: Uma0 },
        ],
        source: { column: 2, row: 3 },
        dest: { column: 0, row: 1 },
        piece: Uma0,
        expected: '１二馬上',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 8, row: 8, piece: Uma1 },
          { column: 6, row: 5, piece: Uma1 },
        ],
        source: { column: 8, row: 8 },
        dest: { column: 8, row: 7 },
        piece: Uma1,
        turn: Gote,
        expected: '９八馬引',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 8, row: 8, piece: Uma1 },
          { column: 6, row: 5, piece: Uma1 },
        ],
        source: { column: 6, row: 5 },
        dest: { column: 8, row: 7 },
        piece: Uma1,
        turn: Gote,
        expected: '９八馬上',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 8, row: 8, piece: Uma0 },
          { column: 4, row: 8, piece: Uma0 },
        ],
        source: { column: 8, row: 8 },
        dest: { column: 6, row: 6 },
        piece: Uma0,
        expected: '７七馬左',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 8, row: 8, piece: Uma0 },
          { column: 4, row: 8, piece: Uma0 },
        ],
        source: { column: 4, row: 8 },
        dest: { column: 6, row: 6 },
        piece: Uma0,
        expected: '７七馬右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 0, row: 0, piece: Uma1 },
          { column: 4, row: 0, piece: Uma1 },
        ],
        source: { column: 0, row: 0 },
        dest: { column: 2, row: 2 },
        piece: Uma1,
        turn: Gote,
        expected: '３三馬左',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 0, row: 0, piece: Uma1 },
          { column: 4, row: 0, piece: Uma1 },
        ],
        source: { column: 4, row: 0 },
        dest: { column: 2, row: 2 },
        piece: Uma1,
        turn: Gote,
        expected: '３三馬右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 3, row: 6, piece: Uma0 },
          { column: 0, row: 7, piece: Uma0 },
        ],
        source: { column: 3, row: 6 },
        dest: { column: 1, row: 8 },
        piece: Uma0,
        expected: '２九馬左',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 3, row: 6, piece: Uma0 },
          { column: 0, row: 7, piece: Uma0 },
        ],
        source: { column: 0, row: 7 },
        dest: { column: 1, row: 8 },
        piece: Uma0,
        expected: '２九馬右',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 5, row: 2, piece: Uma1 },
          { column: 8, row: 1, piece: Uma1 },
        ],
        source: { column: 5, row: 2 },
        dest: { column: 7, row: 0 },
        piece: Uma1,
        turn: Gote,
        expected: '８一馬左',
      })
    )
    .andThen(
      new Setup({
        setups: [
          { column: 5, row: 2, piece: Uma1 },
          { column: 8, row: 1, piece: Uma1 },
        ],
        source: { column: 8, row: 1 },
        dest: { column: 7, row: 0 },
        piece: Uma1,
        turn: Gote,
        expected: '８一馬右',
      })
    )
    .callback()
)
