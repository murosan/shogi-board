import { action, computed, makeObservable, observable } from 'mobx'
import { ShogiBoardClient } from '../../infrastructure/ShogiBoardClient'
import { Info } from '../../model/engine/Info'
import { Options } from '../../model/engine/Optoin'
import {
  Connected,
  Connecting,
  NotConnected,
  StandBy,
  State,
  Thinking,
} from '../../model/engine/State'
import { Position } from '../../model/shogi/Position'
import { EngineState } from '../EngineState'

export class DefaultEngineState implements EngineState {
  names: string[] = []
  current: string | null = null
  options: Options | null = null
  state: State = NotConnected
  result: Info[] | null = null
  serverURL: string = ''

  constructor() {
    makeObservable(this, {
      names: observable,
      current: observable,
      options: observable,
      state: observable,
      result: observable,
      serverURL: observable,
      sbclient: computed,
      setNames: action,
      setState: action,
      connect: action,
      disconnect: action,
      startThinking: action,
      stopThinking: action,
      setResult: action,
      setServerURL: action,
    })
  }

  get sbclient(): ShogiBoardClient {
    return new ShogiBoardClient(this.current || '', this.serverURL)
  }

  async setNames(names: string[]): Promise<void> {
    this.names = names
  }

  async setState(state: State): Promise<void> {
    this.state = state
  }

  async connect(name: string): Promise<void> {
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

  async disconnect(): Promise<void> {
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

  async startThinking(): Promise<void> {
    if (!this.current)
      throw new Error('[startThinking] current engine is not set')

    await this.sbclient.start()
    await this.setState(Thinking)
  }

  async stopThinking(): Promise<void> {
    if (!this.current)
      throw new Error('[stopThinking] current engine is not set')
    if (this.state !== Thinking) return

    await this.sbclient.stop()
    await this.setState(StandBy)
  }

  async setResult(i: Info[]): Promise<void> {
    this.result = i
  }

  async updatePosition(p: Position): Promise<void> {
    await this.sbclient.setPosition(p)
  }

  async setServerURL(s: string): Promise<void> {
    this.serverURL = s
  }
}
