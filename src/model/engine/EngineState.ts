import { observable } from 'mobx'
import { Result } from '../../proto/v1_pb'
import { Options } from './Optoin'

export type State = number

// 接続前
export const NotConnected: State = 0
// 接続中・ローディング中のComponentを表示するため
export const Connecting: State = 1
// 接続済
export const Connected: State = 2
// 将棋エンジン、待機中(思考中ではない)
export const StandBy: State = 3
// 将棋エンジン思考中
export const Thinking: State = 4

export class EngineState {
  // 将棋エンジン一覧
  @observable names: string[]
  // 接続中のエンジン
  @observable current?: string
  @observable options?: Options
  @observable state: State
  @observable result: Result.AsObject | null

  constructor() {
    this.names = []
    this.state = NotConnected
    this.result = null
  }
}
