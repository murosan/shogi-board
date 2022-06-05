import {
  Fu0,
  Fu1,
  Gin0,
  Gin1,
  Gyoku0,
  Gyoku1,
  Hisha0,
  Hisha1,
  Kaku0,
  Kaku1,
  Kei0,
  Kei1,
  Kin0,
  Kin1,
  Kyou0,
  Kyou1,
  NariGin0,
  NariGin1,
  NariKei0,
  NariKei1,
  NariKyou0,
  NariKyou1,
  Piece,
  Ryu0,
  Ryu1,
  To0,
  To1,
  Uma0,
  Uma1,
} from '../../../model/shogi/Piece'
import { Gote, Sente, Turn } from '../../../model/shogi/Turn'
import { success } from '../parser'
import { column, digit, integer, piece, row, time, totalTime } from './util'

describe('piece', () => {
  it('パースできる', () => {
    type Case = [Turn, string, Piece]
    const cases: Case[] = [
      [Sente, '歩', Fu0],
      [Sente, '香', Kyou0],
      [Sente, '桂', Kei0],
      [Sente, '銀', Gin0],
      [Sente, '金', Kin0],
      [Sente, '玉', Gyoku0],
      [Sente, '飛', Hisha0],
      [Sente, '角', Kaku0],
      [Sente, 'と', To0],
      [Sente, '成香', NariKyou0],
      [Sente, '杏', NariKyou0],
      [Sente, '成桂', NariKei0],
      [Sente, '圭', NariKei0],
      [Sente, '成銀', NariGin0],
      [Sente, '全', NariGin0],
      [Sente, '龍', Ryu0],
      [Sente, '竜', Ryu0],
      [Sente, '馬', Uma0],
      //
      [Gote, '歩', Fu1],
      [Gote, '香', Kyou1],
      [Gote, '桂', Kei1],
      [Gote, '銀', Gin1],
      [Gote, '金', Kin1],
      [Gote, '玉', Gyoku1],
      [Gote, '飛', Hisha1],
      [Gote, '角', Kaku1],
      [Gote, 'と', To1],
      [Gote, '成香', NariKyou1],
      [Gote, '杏', NariKyou1],
      [Gote, '成桂', NariKei1],
      [Gote, '圭', NariKei1],
      [Gote, '成銀', NariGin1],
      [Gote, '全', NariGin1],
      [Gote, '龍', Ryu1],
      [Gote, '竜', Ryu1],
      [Gote, '馬', Uma1],
    ]

    for (let [turn, input, expected] of cases) {
      const parser = piece(turn)
      const next = 'abcdef'
      expect(parser.parse(input + next)).toEqual(success(expected, next))
    }
  })

  it('パースできない', () => {
    expect(piece(Sente).parse('知らない子')).toBeNull()
    expect(piece(Sente).parse('')).toBeNull()
  })
})

describe('raw', () => {
  it('パースできる', () => {
    type Case = [string, number]
    // prettier-ignore
    const cases: Case[] = [
      ['一', 0], ['二', 1], ['三', 2],
      ['四', 3], ['五', 4], ['六', 5],
      ['七', 6], ['八', 7], ['九', 8],

      ['１', 0], ['２', 1], ['３', 2],
      ['４', 3], ['５', 4], ['６', 5],
      ['７', 6], ['８', 7], ['９', 8],

      ['1', 0], ['2', 1], ['3', 2],
      ['4', 3], ['5', 4], ['6', 5],
      ['7', 6], ['8', 7], ['9', 8],
    ]

    for (let [input, expected] of cases) {
      const next = 'next'
      expect(row.parse(input + next)).toEqual(success(expected, next))
    }
  })

  it('パースできない', () => {
    const cases = ['0', '０', '〇', '']
    for (let input of cases) {
      expect(row.parse(input)).toBeNull()
    }
  })
})

describe('column', () => {
  it('パースできる', () => {
    type Case = [string, number]
    // prettier-ignore
    const cases: Case[] = [
      ['１', 0], ['２', 1], ['３', 2],
      ['４', 3], ['５', 4], ['６', 5],
      ['７', 6], ['８', 7], ['９', 8],

      ['1', 0], ['2', 1], ['3', 2],
      ['4', 3], ['5', 4], ['6', 5],
      ['7', 6], ['8', 7], ['9', 8],
    ]

    for (let [input, expected] of cases) {
      const next = 'next'
      expect(column.parse(input + next)).toEqual(success(expected, next))
    }
  })

  it('パースできない', () => {
    // prettier-ignore
    const cases = [
      '0', '０', '〇',
      '一', '二', '三',
      '四', '五', '六',
      '七', '八', '九',
      '',
    ];
    for (let input of cases) {
      expect(column.parse(input)).toBeNull()
    }
  })
})

describe('digit', () => {
  it('パースできる', () => {
    type Case = [string, number]
    // prettier-ignore
    const cases: Case[] = [
      ['０', 0], ['１', 1], ['２', 2], ['３', 3], ['４', 4],
      ['５', 5], ['６', 6], ['７', 7], ['８', 8], ['９', 9],

      ['0', 0], ['1', 1], ['2', 2], ['3', 3], ['4', 4],
      ['5', 5], ['6', 6], ['7', 7], ['8', 8], ['9', 9],
    ]

    for (let [input, expected] of cases) {
      const next = 'next'
      expect(digit.parse(input + next)).toEqual(success(expected, next))
    }
  })

  it('パースできない', () => {
    const cases = [
      '〇',
      '一',
      '二',
      '三',
      '四',
      '五',
      '六',
      '七',
      '八',
      '九',
      '',
    ]
    for (let input of cases) {
      expect(digit.parse(input)).toBeNull()
    }
  })
})

describe('integer', () => {
  it('パースできる', () => {
    type Case = [string, number]
    const cases: Case[] = [
      ['123', 123],
      ['0123', 123],
    ]

    for (let [input, expected] of cases) {
      const next = 'next'
      expect(integer.parse(input + next)).toEqual(success(expected, next))
    }
  })

  it('パースできない', () => {
    const cases = ['abc', '']
    for (let input of cases) {
      expect(integer.parse(input)).toBeNull()
    }
  })
})

describe('time', () => {
  it('パースできる', () => {
    type Case = [string, number]
    const cases: Case[] = [
      ['0', 0],
      ['123', 123],
      ['0123', 123],
      ['10:10', 10 * 60 + 10],
      ['10:00', 10 * 60],
      ['00:00', 0],
      ['0:10:10', 10 * 60 + 10],
      ['10:10:10', 10 * 3600 + 10 * 60 + 10],
      ['100:100:10', 100 * 3600 + 100 * 60 + 10],
      ['00:00:00', 0],
      ['1:2:3', 3600 + 2 * 60 + 3],
    ]

    for (let [input, expected] of cases) {
      const next = 'next'
      expect(time.parse(input + next)).toEqual(success(expected, next))
    }
  })

  it('パースできない', () => {
    const cases = ['abc', '10:20:30:40', '']
    for (let input of cases) {
      expect(time.parse(input)).toBeNull()
    }
  })
})

describe('totalTime', () => {
  it('パースできる', () => {
    type Case = [string, number]
    const cases: Case[] = [
      ['各123秒', 123],
      ['各123分', 123 * 60],
      ['各123時間', 123 * 3600],
      ['各10分10秒', 10 * 60 + 10],
      ['各10時間10分10秒', 10 * 3600 + 10 * 60 + 10],
      ['各10時間10秒', 10 * 3600 + 10],
      ['0秒', 0],
      ['0分', 0],
      ['0時間', 0],
      ['0分0秒', 0],
      ['0時間0分', 0],
      ['0時間0分0秒', 0],
    ]

    for (let [input, expected] of cases) {
      const next = 'next'
      expect(totalTime.parse(input + next)).toEqual(success(expected, next))
    }
  })

  it('変なやつ', () => {
    expect(totalTime.parse('0')).toEqual(success(0, '0'))
    expect(totalTime.parse('0123')).toEqual(success(0, '0123'))
    expect(totalTime.parse('各1時間1分10')).toEqual(success(3660, '10'))
    expect(totalTime.parse('10h10m10s')).toEqual(success(0, '10h10m10s'))
    expect(totalTime.parse('abc')).toEqual(success(0, 'abc'))
    expect(totalTime.parse('10:20')).toEqual(success(0, '10:20'))
  })
})
