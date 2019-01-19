import EngineMove from './EngineMove'

export type EngineState = number

export const NotConnected: EngineState = 0
export const Connected: EngineState = 1
export const StandBy: EngineState = 2
export const Thinking: EngineState = 3

export type EngineName = string

export default interface EngineConnection {
  // 将棋エンジン一覧
  names: EngineName[]
  // 接続中のエンジン
  current?: EngineName

  state: EngineState

  results: Map<number, EngineMove>
}
