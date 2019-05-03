import { observable, observe } from 'mobx'
import { EngineState } from '../model/engine/EngineState'
import { StandBy } from '../model/engine/State'
import { Move } from '../model/kif/Move'
import { GameState } from '../model/shogi/GameState'
import { Store } from '../model/store/Store'
import { DefaultEngineState } from './EngineState'
import { DefaultGameState } from './GameState'

export class DefaultStore implements Store {
  @observable gameState: GameState
  @observable engineState: EngineState
  constructor() {
    this.gameState = new DefaultGameState()
    this.engineState = new DefaultEngineState()

    observe(
      this.gameState,
      'currentMove',
      async change => await this.updatePosition(change.newValue)
    )
  }

  async updatePosition(move?: Move): Promise<void> {
    const setPositionExecutable: boolean = this.engineState.state >= StandBy
    if (!setPositionExecutable) return

    const m: Move = move || this.gameState.currentMove
    this.engineState.updatePosition(m.pos)
  }
}
