import { observable, observe } from 'mobx'
import { createContext } from 'react'
import { Connected } from '../model/engine/State'
import { Move } from '../model/kifu/Move'
import { Config } from './Config'
import { DisplayState } from './DisplayState'
import { EngineState } from './EngineState'
import { GameState } from './GameState'
import { DefaultConfig } from './impl/Config'
import { DefaultDisplayState } from './impl/DisplayState'
import { DefaultEngineState } from './impl/EngineState'
import { DefaultGameState } from './impl/GameState'

export interface Store {
  gameState: GameState
  engineState: EngineState
  displayState: DisplayState
  config: Config

  /**
   * 将棋エンジンに対して setPosition を実行する
   * @param move move が渡されなかった場合 gameState から局面を取得し実行する
   *             move を渡さないのは connect 実行後に一度だけの想定
   */
  updatePosition(move?: Move): Promise<void>
}

class DefaultStore implements Store {
  constructor() {
    this.engineState.setServerURL(this.config.serverURL)

    // gameState で現在局面に変更があったら、将棋エンジンに局面をセットする
    observe(this.gameState, 'currentMove', change =>
      this.updatePosition(change.newValue)
    )

    // config の serverURL に変更があったら、engineState の serverURL を更新する
    observe(this.config, 'serverURL', change =>
      this.engineState.setServerURL(change.newValue)
    )
  }

  @observable gameState: GameState = new DefaultGameState()
  @observable engineState: EngineState = new DefaultEngineState()
  @observable displayState: DisplayState = new DefaultDisplayState()
  @observable config: Config = new DefaultConfig()

  async updatePosition(move?: Move): Promise<void> {
    const setPositionExecutable: boolean = this.engineState.state >= Connected
    if (!setPositionExecutable) return

    const m: Move = move || this.gameState.currentMove
    this.engineState.updatePosition(m.pos)
  }
}

export const defaultStore: () => Store = () => new DefaultStore()
export const StoreContext = createContext<Store>(defaultStore())
