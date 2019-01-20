export default interface Config {
  // 選択された駒が移動できる場所を着色するか
  paintTargets: boolean

  // shogi-board-server 用の設定
  server?: {
    protocol: 'http' | 'https'
    host: string
    port: number
  }
}
