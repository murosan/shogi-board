'use strict'

// 各設定のデフォルト値
// 設定を上書きするには、 development.js や production.js という名前でファイルを作成し、
// 上書きしたい項目を記入する。
// 環境変数の NODE_ENV が development なら development.js、
// NODE_ENV が production なら production.js が読み込まれる。

module.exports = {
  // 選択した駒が移動できる場所を着色するか
  paintTargets: true,

  // shogi-board-server 用の設定
  // undefined は使わない設定
  // github.io にデプロイするときは undefined
  server: undefined,
  // 使う場合は以下のように、 development.js や production.js に記入する
  // server: {
  //   protocol: 'http',
  //   host: 'localhost',
  //   port: 8080,
  // },
}
