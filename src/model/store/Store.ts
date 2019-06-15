import { Config } from '../config/Config'
import { DisplayState } from '../display/DisplayState'
import { EngineState } from '../engine/EngineState'
import { Move } from '../kif/Move'
import { GameState } from '../shogi/GameState'

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
