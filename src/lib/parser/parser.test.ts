import {
  fspace,
  fss,
  literal,
  oneOf,
  Parser,
  ParseResult,
  rep,
  repsep,
  s,
  space,
  ss,
  success,
  successful,
  spacing,
} from './parser'

function ParserTest(
  input: string,
  parser: Parser<any>,
  expected: ParseResult<any>
) {
  return () => expect(parser.parse(input)).toEqual(expected)
}

describe('space', () => {
  it('パースできる', ParserTest('   abc', space, success('   ', 'abc')))
  it('パースできる', ParserTest('\t\t', space, success('\t\t', '')))
  it('パースできる', ParserTest('\t\n', space, success('\t\n', '')))
  it('パースできる', ParserTest('\r\n', space, success('\r\n', '')))
  it('パースできる', ParserTest('\t\t\t ', space, success('\t\t\t ', '')))

  it(
    'パースできない(失敗はしない)',
    ParserTest('abc   ', space, success('', 'abc   '))
  )
})

describe('fspace', () => {
  it('半角', ParserTest('　', fspace, success('　', '')))
  it('全角', ParserTest('　', fspace, success('　', '')))
  it('全角*2', ParserTest('　　a', fspace, success('　　', 'a')))
  it('全角+半角', ParserTest('　 a', fspace, success('　 ', 'a')))
})

describe('ss/fss', () => {
  it('左側にスペース', ParserTest('  a', ss('a'), success('a', '')))
  it('左側にスペース', ParserTest('　　a', fss('a'), success('a', '')))

  it('右側にスペース', ParserTest('a  ', ss('a'), success('a', '')))
  it('右側にスペース', ParserTest('a　　', fss('a'), success('a', '')))

  it('両側にスペース', ParserTest('  a  ', ss('a'), success('a', '')))
  it('両側にスペース', ParserTest('　　a　　', fss('a'), success('a', '')))
})

describe('spacing', () => {
  it('左側にスペース', ParserTest('  a', spacing(s('a')), success('a', '')))
  it('右側にスペース', ParserTest('a  ', spacing(s('a')), success('a', '')))
  it('両側にスペース', ParserTest('  a  ', spacing(s('a')), success('a', '')))
})

describe('literal', () => {
  it('終わりまで', ParserTest('abc', literal(), success('abc', '')))
  it('スペースまで', ParserTest('abc ', literal(), success('abc', ' ')))
  it('トークンまで', ParserTest('abc', literal(s('b')), success('a', 'bc')))
  it('空だったらfail', ParserTest('', literal(s('')), null))
})

describe('rep', () => {
  it(
    'パースできる',
    ParserTest('aaabbb', rep(s('a')), success(['a', 'a', 'a'], 'bbb'))
  )

  it(
    'パースできる',
    ParserTest(
      'aaabbb',
      rep(oneOf(['a', 'b'])),
      success(['a', 'a', 'a', 'b', 'b', 'b'], '')
    )
  )

  it(
    'パースできない(失敗はしない)',
    ParserTest('aaabbb', rep(s('b')), success([], 'aaabbb'))
  )

  it(
    'パースできない(失敗はしない)',
    ParserTest('xxaaabbb', rep(oneOf(['a', 'b'])), success([], 'xxaaabbb'))
  )
})

describe('repsep', () => {
  it(
    'パースできる',
    ParserTest(
      'a,a,abc',
      repsep(s('a'), s(',')),
      success(['a', 'a', 'a'], 'bc')
    )
  )

  it(
    'パースできない(失敗はしない)',
    ParserTest(',a,', repsep(s('a'), s(',')), success([], ',a,'))
  )
})

describe('oneOf', () => {
  it(
    'パースできる',
    ParserTest('abcdef', oneOf(['a', 'x', 'y', 'z']), success('a', 'bcdef'))
  )

  it('パースできない', ParserTest('abcdef', oneOf(['x', 'y', 'z']), null))
  it('パースできない', ParserTest('', oneOf(['x', 'y', 'z']), null))

  it('使い方を間違えたらエラー', () => {
    const input = 'abc'
    expect(() => oneOf(['abc', 'y', 'z']).parse(input)).toThrow()
  })
})

describe('successful', () => {
  it(
    '渡した value でパーサーにできる',
    ParserTest('abc', successful('xyz'), success('xyz', 'abc'))
  )
})

describe('Parser', () => {
  it(
    'map で関数を適用できる',
    ParserTest(
      '100',
      oneOf(['1', '2', '3']).map(n => Number(n)),
      success(1, '00')
    )
  )

  it(
    'map の前に失敗したら null',
    ParserTest(
      '100',
      oneOf(['7', '8']).map(n => Number(n)),
      null
    )
  )

  it(
    'comb で合成できる',
    ParserTest(
      'abcdefghi',
      s('abc').comb(s('def')),
      success(['abc', 'def'], 'ghi')
    )
  )

  it('comb 失敗パターン 1', ParserTest('_def', s('abc').comb(s('def')), null))
  it('comb 失敗パターン 2', ParserTest('abc_', s('abc').comb(s('def')), null))

  it(
    'left で左側の値のみ取得できる',
    ParserTest('abc   ', s('abc').left(space), success('abc', ''))
  )

  it('left 失敗パターン 1', ParserTest('xyz   ', s('abc').left(space), null))
  it('left 失敗パターン 2', ParserTest('abc', s('abc').left(s('<-')), null))

  it(
    'right で右側の値のみ取得できる',
    ParserTest('   abc', space.right(s('abc')), success('abc', ''))
  )

  it('right 失敗パターン 1', ParserTest('   xyz', space.right(s('abc')), null))
  it('right 失敗パターン 2', ParserTest('_b', s('=').right(s('b')), null))

  it(
    'or でパースできる方を取得できる 1',
    ParserTest('123', s('1').or(s('2')), success('1', '23'))
  )

  it(
    'or でパースできる方を取得できる 2',
    ParserTest('123', s('2').or(s('1')), success('1', '23'))
  )

  it(
    'fallback でパース失敗しない 1',
    ParserTest('abc', s('abc').fallback(''), success('abc', ''))
  )

  it(
    'fallback でパース失敗しない 2',
    ParserTest('abc', s('xyz').fallback(''), success('', 'abc'))
  )

  it(
    'failif で条件によって Success を null にできる',
    ParserTest(
      '',
      rep(oneOf(['1', '2', '3'])).failif(arr => arr.length === 0),
      null
    )
  )

  it(
    'failif でも、条件によっては Success のまま',
    ParserTest(
      '1  ',
      rep(oneOf(['1', '2', '3'])).failif(arr => arr.length === 0),
      success(['1'], '  ')
    )
  )
})
