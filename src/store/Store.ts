import { observable, observe } from 'mobx'
import { DisplayState } from '../model/display/DisplayState'
import { EngineState } from '../model/engine/EngineState'
import { Connected } from '../model/engine/State'
import { Move } from '../model/kif/Move'
import { GameState } from '../model/shogi/GameState'
import { Store } from '../model/store/Store'
import { DefaultDisplayState } from './DisplayState'
import { DefaultEngineState } from './EngineState'
import { DefaultGameState } from './GameState'

export class DefaultStore implements Store {
  @observable gameState: GameState
  @observable engineState: EngineState
  @observable displayState: DisplayState

  constructor() {
    this.gameState = new DefaultGameState()
    this.engineState = new DefaultEngineState()
    this.displayState = new DefaultDisplayState()

    // gameState で現在局面に変更があったら、将棋エンジンに局面をセットする
    observe(this.gameState, 'currentMove', change =>
      this.updatePosition(change.newValue)
    )
  }

  async updatePosition(move?: Move): Promise<void> {
    const setPositionExecutable: boolean = this.engineState.state >= Connected
    if (!setPositionExecutable) return

    const m: Move = move || this.gameState.currentMove
    this.engineState.updatePosition(m.pos)
  }
}
