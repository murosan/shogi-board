import {
  Fu0,
  Gin0,
  Gyoku0,
  Hisha0,
  Kaku0,
  Kei0,
  Kin0,
  Kyou0,
  NariGin0,
  NariKei0,
  NariKyou0,
  Piece,
  Ryu0,
  To0,
  Uma0,
} from '../model/shogi/Piece'

const rows = ['一', '二', '三', '四', '五', '六', '七', '八', '九']
const columns = ['１', '２', '３', '４', '５', '６', '７', '８', '９']

export const rowString = (r: number) => rows[r]
export const columnString = (c: number) => columns[c]

export const pieceString = (piece: Piece) => {
  const p = Math.abs(piece)

  if (p === Fu0) return '歩'
  if (p === Kyou0) return '香'
  if (p === Kei0) return '桂'
  if (p === Gin0) return '銀'
  if (p === Kin0) return '金'
  if (p === Kaku0) return '角'
  if (p === Hisha0) return '飛'
  if (p === Gyoku0) return '玉'
  if (p === To0) return 'と'
  if (p === NariKyou0) return '成香'
  if (p === NariKei0) return '成桂'
  if (p === NariGin0) return '成銀'
  if (p === Uma0) return '馬'
  if (p === Ryu0) return '龍'

  throw new Error('Failed to ident piece name. received: ' + piece)
}
