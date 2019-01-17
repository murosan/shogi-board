import Position from '../shogi/Position'

export default interface ApiClient {
  connect(): Promise<void>
  close(): Promise<void>
  getOptions<T>(): Promise<T> // TODO: option typeの作成
  setOption<T>(option: T): Promise<void>
  start(): Promise<void>
  setPosition(pos: Position): Promise<void>
  fetchValues<T>(): Promise<T> // TODO: result type の作成
}
