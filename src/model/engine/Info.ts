import { MoveProps } from '../events/MoveProps'

export interface Info {
  // React の key 用ID
  id: string

  // depth, seldepth, time, nodes, nps, hashfull
  values: Map<string, number>

  // 評価値
  score: number

  // 読み筋
  moves: MoveProps[]
}
