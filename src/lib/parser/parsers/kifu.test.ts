import Kifu from '../../../model/kifu/Kifu'
import { Parser } from '../parser'
import { KIF } from './KIF'
import { KifuParser } from './kifu'

it('KIF 形式なら KIF 用パーサーが返される', () => {
  const cases: [string, Parser<Kifu>][] = [['KIF', KIF]]
  for (let [format, expected] of cases) {
    expect(KifuParser(format)).toEqual(expected)
  }
})

it('不明なフォーマットは null パーサー', () => {
  const parser = KifuParser('unknown')
  expect(parser.parse('')).toBeNull()
})
