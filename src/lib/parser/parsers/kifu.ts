import Kifu from '../../../model/kifu/Kifu'
import { Parser } from './../parser'
import { JSONKifuParser } from './JSON'
import { KIF } from './KIF'

export const KifuFormats = {
  kif: 'KIF',
  csa: 'CSA',
  ki2: 'KI2',
  json: 'JSON',
}

export function KifuParser(format: string): Parser<Kifu> {
  // http://kakinoki.o.oo7.jp/kif_format.html
  if (format === KifuFormats.kif) return KIF
  if (format === KifuFormats.json) return JSONKifuParser
  return Parser(_ => null)
}
