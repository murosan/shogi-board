import { observable } from 'mobx'
import { EngineState } from '../model/engine/EngineState'
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
  }
}
