import EngineMove from './EngineMove'

// サーバーから fetch すると取れる値
export class Result {
  private _values: Map<number, Info>
  constructor() {
    this._values = new Map()
  }

  set values(v: Map<number, Info>) {
    this._values = v
  }

  get values() {
    return this._values
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
