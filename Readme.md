# 将棋 検討盤

動作例 : https://fast-citadel-13484.herokuapp.com/  
ブラウザで動く将棋検討盤です。  
駒はルールに則って動きます(王手、詰み判定はありません)。

<img src="https://github.com/murosan/pictures-for-readme/blob/master/shogi-board-ex_20170831.png" width="75%;">

## 対応ブラウザ

最新版のGoogle Chrome、Safari。PCで見てください。  

## 開発

- セットアップ

  Node.js v6.11.1 以上が必要です。また、npmに変えてyarnを使用しています。

```
$ git clone https://github.com/murosan/shogi-board
$ cd shogi-board
$ yarn
$ yarn start
// yarn run start-w で自動化
// localhost:3000にアクセス
```

- ビルド

```
$ yarn run webpack
// yarn run webpack-w で自動化
```

- 使用した主なライブラリ

  - [Express](https://github.com/expressjs/express)
  - [TypeScript](https://github.com/Microsoft/TypeScript)
  - [React.js](https://github.com/facebook/react)
  - [Node-Sass](https://github.com/sass/node-sass)
  - [Webpack](https://github.com/webpack/webpack)


## ライセンス

- ソースコード  
  ISC license

- イメージ・画像
  - pieces, board(adapted)  
    by [muchonovski](http://mucho.girly.jp/bona)  
    under [Creative Commons 表示-非営利 2.1 日本 License](https://creativecommons.org/licenses/by-nc/2.1/jp/)

  - tatami  
    [フリーテクスチャ素材館](https://free-texture.net/seamless-pattern/tatami01.html)

  - other  
    free material
