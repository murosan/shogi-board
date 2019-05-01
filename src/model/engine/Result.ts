import { EngineMove } from './EngineMove'

// サーバーから fetch すると取れる値
export class Result {
  values: Map<number, Info>
  constructor() {
    this.values = new Map()
  }
}

// エンジンの読み
export class Info {
  values: Map<string, number>
  score: number
  moves: EngineMove[]
  constructor(values: Map<string, number>, score: number, moves: EngineMove[]) {
    this.values = values
    this.score = score
    this.moves = moves
  }
}
