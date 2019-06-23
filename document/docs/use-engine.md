---
id: use-engine
title: 将棋ソフトを使う
---

将棋ソフトを使って、検討する方法を紹介します

- [手順](#%E6%89%8B%E9%A0%86)
  - [1. 将棋ソフトの実行バイナリを用意する](#1-%E5%B0%86%E6%A3%8B%E3%82%BD%E3%83%95%E3%83%88%E3%81%AE%E5%AE%9F%E8%A1%8C%E3%83%90%E3%82%A4%E3%83%8A%E3%83%AA%E3%82%92%E7%94%A8%E6%84%8F%E3%81%99%E3%82%8B)
  - [2. shogi-board-server をダウンロードする](#2-shogi-board-server-%E3%82%92%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89%E3%81%99%E3%82%8B)
    - [A. 自分でビルドする場合](#A-%E8%87%AA%E5%88%86%E3%81%A7%E3%83%93%E3%83%AB%E3%83%89%E3%81%99%E3%82%8B%E5%A0%B4%E5%90%88)
    - [B. ダウンロードして使用する場合](#B-%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89%E3%81%97%E3%81%A6%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B%E5%A0%B4%E5%90%88)
  - [3. 設定ファイルを用意する](#3-%E8%A8%AD%E5%AE%9A%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E7%94%A8%E6%84%8F%E3%81%99%E3%82%8B)
    - [A. ビルドした場合](#A-%E3%83%93%E3%83%AB%E3%83%89%E3%81%97%E3%81%9F%E5%A0%B4%E5%90%88)
    - [B. ダウンロードした場合](#B-%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89%E3%81%97%E3%81%9F%E5%A0%B4%E5%90%88)
  - [4. shogi-board-server を立ち上げる](#4-shogi-board-server-%E3%82%92%E7%AB%8B%E3%81%A1%E4%B8%8A%E3%81%92%E3%82%8B)
    - [A. ビルドした場合](#A-%E3%83%93%E3%83%AB%E3%83%89%E3%81%97%E3%81%9F%E5%A0%B4%E5%90%88-1)
    - [B. ダウンロードした場合](#B-%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89%E3%81%97%E3%81%9F%E5%A0%B4%E5%90%88-1)
  - [5. Shogi Board をブラウザで開く](#5-Shogi-Board-%E3%82%92%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%A7%E9%96%8B%E3%81%8F)
  - [6. サーバーの URL を設定する](#6-%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%81%AE-URL-%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B)
  - [7. 将棋ソフトを使う](#7-%E5%B0%86%E6%A3%8B%E3%82%BD%E3%83%95%E3%83%88%E3%82%92%E4%BD%BF%E3%81%86)

# 手順

## 1. 将棋ソフトの実行バイナリを用意する

このステップは各自でお願いします。  
実行可能なファイルであることを確認してください。

どうしても分からない場合、
<u>[issue](https://github.com/murosan/shogi-board/issues)</u>
を立てていただければできるだけ対応します。

## 2. shogi-board-server をダウンロードする

> 将棋ソフトを使用するには、`shogi-board-server` を使う必要があります。
>
> ブラウザから将棋ソフトを直接実行することはできません。  
> そのため、将棋ソフトは `shogi-board-server` から起動し、
> その出力結果を API を通して `Shogi Board` 側に取り込むことで
> ブラウザからの操作を実現しています。

### A. 自分でビルドする場合

※ `Go` の実行環境が必要です

```sh
$ go get -u github.com/murosan/shogi-board-server
```

最新版への更新も上記コマンドのみで可能です(`-u` を忘れないこと)。

### B. ダウンロードして使用する場合

- Linux 用バイナリは用意してません。要望があれば対応します。
- Windows は開発者がデバイスを所持していないため、動作確認できていません。
  動かない場合、<u>[issue](https://github.com/murosan/shogi-board/issues)</u> へお願いします。

以下のページからバイナリをダウンロードできます。

<u>https://github.com/murosan/shogi-board-server/releases</u>

## 3. 設定ファイルを用意する

### A. ビルドした場合

将棋ソフトの名前と実行パスが書かれた設定ファイルを `YAML` で作成します。  
以下の例を参考にしてください。

```yml
# app.config.yml などのファイル名で作成します
#
# engines の下に以下のフォーマットで1つ以上記入してください
# 実行パスは絶対パスを推奨します
#
# engines:
#   将棋ソフトの名前: 実行パス
engines:
  engine1: /Users/murosan/shogi/engines/engine1
  engine2: /Users/murosan/shogi/engines/engine2
  engine3: /Users/murosan/shogi/engines/engine3
```

### B. ダウンロードした場合

すでに `./config/app.config.yml` が用意されていますので、各自編集してください。

## 4. shogi-board-server を立ち上げる

サーバーを起動します

### A. ビルドした場合

```sh
# $GOPATH/bin に shogi-board-server というバイナリが作成されています
# ./app.config.yml の部分に先ほど作成した設定ファイルのパスを指定してください
$ shogi-board-server -app_config ./app.config.yml
```

### B. ダウンロードした場合

- macOS の場合
  - `ターミナル.app` を開く
  - `sbserver` をドラッグ&ドロップする
  - `Enter`
- Windows の場合 (Help wanted)
  - `sbserver.exe` をダブルクリック？

## 5. Shogi Board をブラウザで開く

<u>[Getting Started](getting-started)</u> を参考に、
いずれかの方法で `Shogi Board` を開きます

## 6. サーバーの URL を設定する

左下の「設定」をクリックします。  
「shogi-board-server の URL」に `http://localhost:8080` を入力します。
これは、4 で起動したサーバーの URL です。

「Cookie に保存」を `ON` にすると次回以降入力を省略できます。  
入力が完了したら、設定画面は閉じます。

## 7. 将棋ソフトを使う

1. 「将棋エンジン」をクリックします
2. 正しく設定できていれば、一覧が表示されます
3. 使いたい将棋ソフトをクリックします
4. その将棋ソフトのオプション設定画面が表示されます
5. 「思考開始」をクリックします
