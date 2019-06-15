import { action, computed, observable } from 'mobx'
import { ShogiBoardClient } from '../infrastructure/ShogiBoardClient'
import { EngineState } from '../model/engine/EngineState'
import { Info } from '../model/engine/Info'
import { Options } from '../model/engine/Optoin'
import {
  Connected,
  Connecting,
  NotConnected,
  StandBy,
  State,
  Thinking,
} from '../model/engine/State'
import { Position } from '../model/shogi/Position'

export class DefaultEngineState implements EngineState {
  @observable names: string[]
  @observable current: string | null
  @observable options: Options | null
  @observable state: State
  @observable result: Info[] | null

  constructor() {
    this.names = []
    this.current = null
    this.options = null
    this.state = NotConnected
    this.result = null
  }

  @computed get sbclient(): ShogiBoardClient {
    return new ShogiBoardClient(this.current || '')
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
      this.options = await this.sbclient.getOptions()
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

    await this.sbclient.start()
    await this.setState(Thinking)
  }

  @action async stopThinking(): Promise<void> {
    if (!this.current)
      throw new Error('[stopThinking] current engine is not set')
    if (this.state !== Thinking) return

    await this.sbclient.stop()
    await this.setState(StandBy)
  }

  @action async setResult(i: Info[]): Promise<void> {
    this.result = i
  }

  async updatePosition(p: Position): Promise<void> {
    await this.sbclient.setPosition(p)
  }
}
