import { observable } from 'mobx'
import { Options } from './Optoin'
import { Result } from './Result'

export type State = number

export const NotConnected: State = 0
export const Connecting: State = 1
export const Connected: State = 2
export const StandBy: State = 3
export const Thinking: State = 4

export class EngineState {
  // 将棋エンジン一覧
  @observable names: string[]
  // 接続中のエンジン
  @observable current?: string
  @observable options?: Options
  @observable state: State
  @observable result: Result

  constructor() {
    this.names = []
    this.state = NotConnected
    this.result = new Result()
  }
}
