import Kifu from '../../../model/kifu/Kifu'
import { Parser, success } from '../parser'

// FIXME: バージョン管理できない
export const JSONKifuParser: Parser<Kifu> = Parser(input => {
  const parsed = JSON.parse(input) as Kifu
  return success(parsed, '')
})
