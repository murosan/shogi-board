import { EngineState } from '../engine/EngineState'
import { GameState } from '../shogi/GameState'

export interface Store {
  gameState: GameState
  engineState: EngineState
}
