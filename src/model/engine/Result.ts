import EngineMove from './EngineMove'

// サーバーから fetch すると取れる値
export default interface Result {
  values: Map<number, Info>
}

// エンジンの読み
export interface Info {
  values: Map<string, number>
  score: number
  moves: EngineMove[]
}
