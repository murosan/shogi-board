# Shogi Board・ブラウザ将棋盤

[![build](https://img.shields.io/circleci/project/github/murosan/shogi-board.svg?style=flat-square)](https://circleci.com/gh/murosan/shogi-board)
[![coverage](https://img.shields.io/codecov/c/github/murosan/shogi-board.svg?style=flat-square)](https://codecov.io/gh/murosan/shogi-board)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg?style=flat-square)](https://github.com/facebook/jest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![LICENSE](https://img.shields.io/github/license/murosan/shogi-board.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![tag](https://img.shields.io/github/tag/murosan/shogi-board.svg?style=flat-square)](https://github.com/murosan/shogi-board/releases)
[![node](https://img.shields.io/badge/node-%3E=%2013.7.0-brightgreen.svg?style=flat-square)](https://nodejs.org/ja/)

まずは Playground(Web 将棋盤) でお試しください  
<https://murosan.github.io/shogi-board/playground/>

ドキュメントはこちら  
<https://murosan.github.io/shogi-board/>

<div style="width: 80%">
  <img src="./document/website/static/img/shogi-board.jpg" alt="shogi-board sample image">
</div>

## できること

- ブラウザ上で駒を動かして将棋の検討や棋譜並べができる

## 使い方

ソースコードと、依存ライブラリのダウンロード

```sh
git clone git@github.com:murosan/shogi-board.git
cd shogi-board
yarn
```

開発サーバーを立ち上げる

```sh
yarn start
# chrome で
# http://localhost:3000/ にアクセス
```

## ライセンス

### ソースコード

[MIT License](./LICENSE)

### 駒の画像

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja" target="_blank"><img alt="クリエイティブ・コモンズ・ライセンス" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />
<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja" target="_blank">クリエイティブ・コモンズ 表示 - 非営利 - 継承 4.0 国際 ライセンス</a>

利用する際は、[このページ](https://github.com/murosan/shogi-board)か[Shogi Board](https://murosan.github.io/shogi-board/)のリンク（または両方）と  
著作者（murosan）をクレジット表示してください。

### その他の画像

- 盤面(色調改変あり)

  by [muchonovski](http://mucho.girly.jp/bona)  
  under [Creative Commons 表示-非営利 2.1 日本 License](https://creativecommons.org/licenses/by-nc/2.1/jp/)

- 畳

  [フリーテクスチャ素材館](https://free-texture.net/seamless-pattern/tatami01.html)

- その他

  free material
