import { ShogiBoardClient } from '../infrastructure/ShogiBoardClient'
import { Position } from '../model/shogi/Position'
import { Info } from '../model/engine/Info'
import { Options } from '../model/engine/Optoin'
import { State } from '../model/engine/State'

/**
 * 将棋エンジンの状態を Store として保持するためのインターフェース
 */
export interface EngineState {
  // 将棋エンジン一覧
  names: string[]

  // 接続中の将棋エンジン
  current: string | null

  // 接続中の将棋エンジンから取得したオプション一覧
  // 接続時に初期化する
  options: Options | null

  // 将棋エンジンの状態
  state: State

  // 将棋エンジンの思考結果
  result: Info[] | null

  // api client
  sbclient: ShogiBoardClient

  // サーバー側に設定されている将棋エンジンの名前一覧をセットする
  setNames(names: string[]): Promise<void>

  // State の変更
  setState(s: State): Promise<void>

  // 将棋エンジンに接続
  connect(name: string): Promise<void>

  // 将棋エンジンとの接続を解除
  disconnect(): Promise<void>

  // 思考開始
  startThinking(): Promise<void>

  // 思考停止
  stopThinking(): Promise<void>

  // 思考結果をセット
  setResult(i: Info[]): Promise<void>

  // 局面の更新
  updatePosition(p: Position): Promise<void>

  setServerURL(s: string): Promise<void>
}
