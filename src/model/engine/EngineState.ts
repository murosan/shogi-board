import { Result } from '../../proto/v1_pb'

export type State = number

export const NotConnected: State = 0
export const Connected: State = 1
export const StandBy: State = 2
export const Thinking: State = 3

export default interface EngineState {
  // 将棋エンジン一覧
  names: string[]
  // 接続中のエンジン
  current?: string

  state: State

  result: Result
}

export function newEngineState(): EngineState {
  return {
    names: [],
    state: NotConnected,
    result: new Result(),
  }
}
