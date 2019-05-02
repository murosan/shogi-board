import interval from 'interval-promise'
import { action, computed, observable } from 'mobx'
import { EngineState } from '../model/engine/EngineState'
import { Options } from '../model/engine/Optoin'
import {
  Connected,
  Connecting,
  NotConnected,
  StandBy,
  State,
  Thinking,
} from '../model/engine/State'
import { ShogiBoardClient } from '../proto/factory'
import { Result } from '../proto/v1_pb'

const GET_RESULT_INTERVAL = 1000 // ms

export class DefaultEngineState implements EngineState {
  @observable names: string[]
  @observable current: string | null
  @observable options: Options | null
  @observable state: State
  @observable result: Result.AsObject | null
  @observable controllerIsVisible: boolean

  constructor() {
    this.names = []
    this.current = null
    this.options = null
    this.state = NotConnected
    this.result = null
    this.controllerIsVisible = false
  }

  @computed get sbclient(): ShogiBoardClient {
    return new ShogiBoardClient(this.current || '')
  }

  @action async showController(): Promise<void> {
    this.controllerIsVisible = true
  }

  @action async closeController(): Promise<void> {
    this.controllerIsVisible = false
  }

  @action async setNames(names: string[]): Promise<void> {
    this.names = names
  }

  @action async setState(state: State): Promise<void> {
    this.state = state
  }

  @action async connect(name: string): Promise<void> {
    if (!this.names.includes(name))
      throw new Error('Unknown engine name. name=' + name)

    this.current = name
    try {
      this.setState(Connecting)
      await this.sbclient.connect()
      const options: Options = await this.sbclient.getOptions()
      this.options = options
      this.setState(Connected)
    } catch (e) {
      console.error('Failed to connect', e)
      alert('接続に失敗しました') // TODO
      await this.disconnect()
    }
  }

  @action async disconnect(): Promise<void> {
    try {
      await this.sbclient.close()
    } catch (e) {
      console.error('接続解除に失敗しました', e)
    } finally {
      this.current = null
      this.options = null
      this.state = NotConnected
    }
  }

  @action async startThinking(): Promise<void> {
    if (!this.current)
      throw new Error('[startThinking] current engine is not set')

    try {
      await this.sbclient.start()
      await this.setState(Thinking)
      await this.closeController()

      // 思考を開始したら、思考結果を定期的に取得する
      interval(async (_, stop) => {
        if (!this.current || this.state !== Thinking) {
          stop()
          return
        }
        try {
          const result: Result.AsObject = await this.sbclient.getResult()
          this.setResult(result)
        } catch (e) {
          console.error(e)
        }
      }, GET_RESULT_INTERVAL)
    } catch (e) {
      console.error('[startThinking] failed to start', e)
    }
  }

  @action async stopThinking(): Promise<void> {
    if (!this.current)
      throw new Error('[stopThinking] current engine is not set')
    if (this.state !== Thinking) return

    await this.sbclient.stop()
    await this.setState(StandBy)
  }

  @action async setResult(r: Result.AsObject): Promise<void> {
    this.result = r
  }
}
