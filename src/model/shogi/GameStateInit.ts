import { newValidationInfo } from '../../lib/handler/validation-info'
import GameState from './GameState'
import { hirate } from './PositionInit'

/**
 * 平手の初期局面がセットされた GameState を返す
 */
export function newGameState(): GameState {
  return {
    pos: hirate(),
    indexes: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    selected: undefined,
    confirm: undefined,
    vi: newValidationInfo(),
  }
}
