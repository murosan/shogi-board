import { makeObservable, observable, reaction } from 'mobx'
import { createContext } from 'react'
import { KifuStorage } from '../infrastructure/local-storage'
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
  gameState: GameState = new DefaultGameState()
  engineState: EngineState = new DefaultEngineState()
  displayState: DisplayState = new DefaultDisplayState()
  config: Config = new DefaultConfig()

  private kifuStorage = new KifuStorage()

  constructor() {
    makeObservable(this, {
      gameState: observable,
      engineState: observable,
      displayState: observable,
      config: observable,
    })

    this.engineState.setServerURL(this.config.serverURL)

    // ローカルストレージに前回の棋譜が保存されていたら読み込む
    if (this.config.saveKifuToLocalStorage) {
      const loaded = this.kifuStorage.getKifu()
      if (loaded) this.gameState.setKifu(loaded)
    }

    // gameState で現在局面に変更があったら、将棋エンジンに局面をセットする
    reaction(
      () => this.gameState.currentMove,
      currentMove => this.updatePosition({ ...currentMove })
    )

    // config の serverURL に変更があったら、engineState の serverURL を更新する
    reaction(
      () => this.config.serverURL,
      serverURL => this.engineState.setServerURL(serverURL)
    )

    // 棋譜が更新されたらローカルストレージに保存
    reaction(
      () => this.gameState.kifu,
      kifu =>
        this.config.saveKifuToLocalStorage && this.kifuStorage.setKifu(kifu)
    )
    reaction(
      () => this.config.saveKifuToLocalStorage,
      save => {
        if (save) this.kifuStorage.setKifu(this.gameState.kifu)
        else this.kifuStorage.deleteKifu()
      }
    )
  }

  async updatePosition(move?: Move): Promise<void> {
    const setPositionExecutable: boolean = this.engineState.state >= Connected
    if (!setPositionExecutable) return

    const m: Move = move || this.gameState.currentMove
    this.engineState.updatePosition(m.pos)
  }
}

export const defaultStore: () => Store = () => new DefaultStore()
export const StoreContext = createContext<Store>(defaultStore())
