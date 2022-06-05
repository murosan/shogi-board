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
} from '../../../model/shogi/Piece'
import { Turn } from '../../../model/shogi/Turn'
import { Parser, rep, s, ss, success, repsep } from '../parser'

export function piece(turn: Turn): Parser<Piece> {
  return Parser(s => {
    if (s.length === 0) return null
    const st = (t: string) => s.startsWith(t)
    const suc = (p: Piece, n: number) => success(p * turn, s.substring(n))
    if (st('歩')) return suc(Fu0, 1)
    if (st('香')) return suc(Kyou0, 1)
    if (st('桂')) return suc(Kei0, 1)
    if (st('銀')) return suc(Gin0, 1)
    if (st('金')) return suc(Kin0, 1)
    if (st('玉')) return suc(Gyoku0, 1)
    if (st('角')) return suc(Kaku0, 1)
    if (st('飛')) return suc(Hisha0, 1)
    if (st('と')) return suc(To0, 1)
    if (st('成香')) return suc(NariKyou0, 2)
    if (st('杏')) return suc(NariKyou0, 1)
    if (st('成桂')) return suc(NariKei0, 2)
    if (st('圭')) return suc(NariKei0, 1)
    if (st('成銀')) return suc(NariGin0, 2)
    if (st('全')) return suc(NariGin0, 1)
    if (st('馬')) return suc(Uma0, 1)
    if (st('龍') || st('竜')) return suc(Ryu0, 1)
    return null
  })
}

export const row: Parser<number> = Parser(input => {
  const s = input[0]
  const next = () => input.substring(1)
  if (s === '一' || s === '１' || s === '1') return success(0, next())
  if (s === '二' || s === '２' || s === '2') return success(1, next())
  if (s === '三' || s === '３' || s === '3') return success(2, next())
  if (s === '四' || s === '４' || s === '4') return success(3, next())
  if (s === '五' || s === '５' || s === '5') return success(4, next())
  if (s === '六' || s === '６' || s === '6') return success(5, next())
  if (s === '七' || s === '７' || s === '7') return success(6, next())
  if (s === '八' || s === '８' || s === '8') return success(7, next())
  if (s === '九' || s === '９' || s === '9') return success(8, next())
  return null
})

export const column: Parser<number> = Parser(input => {
  const s = input[0]
  const next = () => input.substring(1)
  if (s === '１' || s === '1') return success(0, next())
  if (s === '２' || s === '2') return success(1, next())
  if (s === '３' || s === '3') return success(2, next())
  if (s === '４' || s === '4') return success(3, next())
  if (s === '５' || s === '5') return success(4, next())
  if (s === '６' || s === '6') return success(5, next())
  if (s === '７' || s === '7') return success(6, next())
  if (s === '８' || s === '8') return success(7, next())
  if (s === '９' || s === '9') return success(8, next())
  return null
})

export const digit: Parser<number> = Parser(input => {
  const s = input[0]
  const next = input.substring(1)
  if (s === '０' || s === '0') return success(0, next)
  if (s === '１' || s === '1') return success(1, next)
  if (s === '２' || s === '2') return success(2, next)
  if (s === '３' || s === '3') return success(3, next)
  if (s === '４' || s === '4') return success(4, next)
  if (s === '５' || s === '5') return success(5, next)
  if (s === '６' || s === '6') return success(6, next)
  if (s === '７' || s === '7') return success(7, next)
  if (s === '８' || s === '8') return success(8, next)
  if (s === '９' || s === '9') return success(9, next)
  return null
})

export const integer: Parser<number> = rep(digit)
  .failif(arr => arr.length === 0)
  .map(arr => {
    let n = 0
    for (let i = 0; i < arr.length; i++) {
      n *= 10
      n += arr[i]
    }
    return n
  })

// hh:mm:ss を秒に変換する
// ss、mm:ss も OK
export const time: Parser<number> = repsep(integer, s(':'))
  .failif(n => n.length === 0 || n.length > 3)
  .map(nums => {
    let sec: number = 0
    for (let i = 0; i < nums.length; i++) {
      sec *= 60
      sec += nums[i]
    }
    return sec
  })

// 持ち時間：各６時間
// のような文字列をパースし、秒に変換する
// `各` はあってもなくても良い
// h時間m分s秒 をパースできるようになっている
// それ以外 0 秒にしておく
const each = ss('各').fallback('')
const hour = integer.left(ss('時間')).fallback(0)
const minutes = integer.left(ss('分')).fallback(0)
const seconds = integer.left(ss('秒')).fallback(0)
export const totalTime: Parser<number> = each
  .right(hour)
  .comb(minutes)
  .comb(seconds)
  .map(([[h, m], s]) => h * 3600 + m * 60 + s)
