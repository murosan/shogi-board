import { Gyoku0, Gyoku1, Piece } from '../../model/shogi/Piece'

/**
 * 持ち駒を1つ増やす
 * @param cap number[] 持ち駒を表す配列。詳細は Position.ts
 * @param p Piece 増やしたい駒
 */
export function increaseCaptures(cap: number[], p: Piece): number[] {
  return handle(cap, p, i => i + 1)
}

/**
 * 持ち駒を1つ減らす
 * @param cap number[] 持ち駒を表す配列。詳細は Position.ts
 * @param p Piece 減らしたい駒
 */
export function decreaseCaptures(cap: number[], p: Piece): number[] {
  return handle(cap, p, i => i - 1)
}

function handle(cap: number[], p: Piece, f: (i: number) => number): number[] {
  if (p < 0) throw new Error('Piece ID of Captures must be positive value.')
  if (p === Gyoku0 || p === Gyoku1 || p > 10)
    throw new Error('Piece ID of Captures must not be Gyoku or over 10.')

  return cap.map((count, index) => {
    // 駒IDが一致しなければそのまま
    if (index !== Math.abs(p - 1)) return count

    const v = f(count)
    if (v < 0)
      throw new Error(
        'Invalid function call. Captures must not contain negative value.'
      )

    return v
  })
}
