# 将棋 検討盤

動作例 : https://fast-citadel-13484.herokuapp.com/  
ブラウザで動く将棋検討盤です。  
駒はルールに則って動きます(王手、詰み判定はありません)。

<img src="https://github.com/murosan/pictures-for-readme/blob/master/shogi-board-ex.png" width="60%;">

## 対応ブラウザ

最新版の Google Chrome、Safari

## 開発

- セットアップ

  Node.js v6.11.1 以上が必要です。

```
$ git clone https://github.com/murosan/shogi-board
$ cd shogi-board
$ npm install
$ npm start
// npm run start-w で自動化
// localhost:3000にアクセス
```

- ビルド

```
$ npm run webpack
// npm run webpack-w で自動化
```

- 使用した主なライブラリ

  - [Express](https://github.com/expressjs/express)
  - [TypeScript](https://github.com/Microsoft/TypeScript)
  - [React.js](https://github.com/facebook/react)
  - [Sass](https://github.com/sass/sass)
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
