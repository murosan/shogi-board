# 将棋 検討盤

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![codecov](https://codecov.io/gh/murosan/shogi-board/branch/master/graph/badge.svg)](https://codecov.io/gh/murosan/shogi-board)
[![CircleCI](https://circleci.com/gh/murosan/shogi-board.svg?style=shield&circle-token=6bd215d906d59c7131ea2934670de1df969c96e2)](https://circleci.com/gh/murosan/shogi-board)

動作例 : https://shogi-board.herokuapp.com/  
ブラウザで動く将棋検討盤です。  
駒はルールに則って動きます(王手、詰み判定はありません)。

<img src="https://github.com/murosan/pictures-for-readme/blob/master/shogi_board_20171028.png" width="75%;">

## 対応ブラウザ

PC 最新版の Chrome のみ

## 開発

- セットアップ

  Node.js `v10.14.1`

  ```sh
  $ git clone https://github.com/murosan/shogi-board
  $ cd shogi-board
  $ yarn
  ```

- ビルド

  ```sh
  # 本番
  $ yarn build
  # 開発
  $ yarn start
  ```

- テスト

  ```sh
  # watch
  $ yarn test
  # coverage
  $ yarn test:c
  ```

### ファイル構成

- src/
  - components/  
    React コンポーネント(UI 部分)
  - fn/  
    駒の動き判定、文字列関係の関数
  - game-handler  
    駒の配置や持ち駒、棋譜生成などに関するクラスがある  
    配置(Positions)クラス  
    持ち駒(Captures)クラス  
    駒(Piece)クラス  
    棋譜(Kif / Branch)クラスなど

## ライセンス

- ソースコード  
  MIT License

- イメージ・画像

  - pieces, board(adapted)  
    by [muchonovski](http://mucho.girly.jp/bona)  
    under [Creative Commons 表示-非営利 2.1 日本 License](https://creativecommons.org/licenses/by-nc/2.1/jp/)

  - tatami  
    [フリーテクスチャ素材館](https://free-texture.net/seamless-pattern/tatami01.html)

  - other  
    free material
