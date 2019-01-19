import Position from '../shogi/Position'
import Result from '../engine/Result'

// gRPC とか迷っている
// docker 周り整備したら移行すると思う
export default interface ApiClient {
  connect(): Promise<void>
  close(): Promise<void>
  getOptions<T>(): Promise<T> // TODO: option typeの作成
  setOption<T>(option: T): Promise<void>
  start(): Promise<void>
  setPosition(pos: Position): Promise<void>
  fetchResult(): Promise<Result>
}
