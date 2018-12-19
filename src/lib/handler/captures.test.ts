import {
  Fu0,
  Fu1,
  Gin0,
  Gyoku0,
  Hisha0,
  Kaku0,
  Kei0,
  Kin0,
  Kyou0,
  To0,
} from '../../model/shogi/Piece'
import { decreaseCaptures, increaseCaptures } from './captures'

const empty: number[] = [0, 0, 0, 0, 0, 0, 0]

describe('持ち駒を増やすことができる', async () => {
  it('歩', async () => {
    const after: number[] = increaseCaptures(empty, Fu0)
    const expected: number[] = [1, 0, 0, 0, 0, 0, 0]
    expect(after).toEqual(expected)
  })
  it('香', async () => {
    const after: number[] = increaseCaptures(empty, Kyou0)
    const expected: number[] = [0, 1, 0, 0, 0, 0, 0]
    expect(after).toEqual(expected)
  })
  it('桂', async () => {
    const after: number[] = increaseCaptures(empty, Kei0)
    const expected: number[] = [0, 0, 1, 0, 0, 0, 0]
    expect(after).toEqual(expected)
  })
  it('銀', async () => {
    const after: number[] = increaseCaptures(empty, Gin0)
    const expected: number[] = [0, 0, 0, 1, 0, 0, 0]
    expect(after).toEqual(expected)
  })
  it('金', async () => {
    const after: number[] = increaseCaptures(empty, Kin0)
    const expected: number[] = [0, 0, 0, 0, 1, 0, 0]
    expect(after).toEqual(expected)
  })
  it('角', async () => {
    const after: number[] = increaseCaptures(empty, Kaku0)
    const expected: number[] = [0, 0, 0, 0, 0, 1, 0]
    expect(after).toEqual(expected)
  })
  it('飛', async () => {
    const after: number[] = increaseCaptures(empty, Hisha0)
    const expected: number[] = [0, 0, 0, 0, 0, 0, 1]
    expect(after).toEqual(expected)
  })
})

describe('持ち駒を減らすことができる', async () => {
  it('歩', async () => {
    const before: number[] = [1, 0, 0, 0, 0, 0, 0]
    const after: number[] = decreaseCaptures(before, Fu0)
    expect(after).toEqual(empty)
  })
  it('香', async () => {
    const before: number[] = [0, 1, 0, 0, 0, 0, 0]
    const after: number[] = decreaseCaptures(before, Kyou0)
    expect(after).toEqual(empty)
  })
  it('桂', async () => {
    const before: number[] = [0, 0, 1, 0, 0, 0, 0]
    const after: number[] = decreaseCaptures(before, Kei0)
    expect(after).toEqual(empty)
  })
  it('銀', async () => {
    const before: number[] = [0, 0, 0, 1, 0, 0, 0]
    const after: number[] = decreaseCaptures(before, Gin0)
    expect(after).toEqual(empty)
  })
  it('金', async () => {
    const before: number[] = [0, 0, 0, 0, 1, 0, 0]
    const after: number[] = decreaseCaptures(before, Kin0)
    expect(after).toEqual(empty)
  })
  it('角', async () => {
    const before: number[] = [0, 0, 0, 0, 0, 1, 0]
    const after: number[] = decreaseCaptures(before, Kaku0)
    expect(after).toEqual(empty)
  })
  it('飛', async () => {
    const before: number[] = [0, 0, 0, 0, 0, 0, 1]
    const after: number[] = decreaseCaptures(before, Hisha0)
    expect(after).toEqual(empty)
  })
})

describe('不正な値が渡されたらエラー', async () => {
  it('マイナスの駒IDを渡すとエラー', async () => {
    const r = /must be positive value.$/
    expect(() => increaseCaptures(empty, Fu1)).toThrowError(r)
    expect(() => decreaseCaptures(empty, Fu1)).toThrowError(r)
  })
  it('減らすと数がマイナスになる時もエラー', async () => {
    const r = /Captures must not contain negative value.$/
    expect(() => decreaseCaptures(empty, Fu0)).toThrowError(r)
  })
  it('玉や成駒はエラー', async () => {
    const r = /Captures must not be Gyoku or over 10.$/
    expect(() => increaseCaptures(empty, Gyoku0)).toThrowError(r)
    expect(() => decreaseCaptures(empty, Gyoku0)).toThrowError(r)

    expect(() => increaseCaptures(empty, To0)).toThrowError(r)
    expect(() => decreaseCaptures(empty, To0)).toThrowError(r)
  })
})
