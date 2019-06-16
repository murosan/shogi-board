---
id: use-engine
title: 将棋ソフトを使う
---

将棋ソフトを使って、検討する方法を紹介します

# 手順

## 1. 将棋ソフトの実行バイナリを用意する

このステップは各自でお願いします。  
実行可能なファイルであることを確認してください。

どうしても分からない場合、issue を立てていただければできるだけ対応します。

## 2. shogi-board-server をダウンロードする

将棋ソフトを使用するには、`shogi-board-server` を使う必要があります。  
macOS の場合、以下の URL からダウンロードできます。

https://github.com/murosan/shogi-board-server/releases

Windows/Linux の方、macOS でも自分でビルドしたい方は、以下を参考にしてください

```sh
# Go が必要です。最新版を使用してください。
# また、環境変数で Go Modules を on にしてください
$ go version
go version go1.12.6 darwin/amd64
$ export GO111MODULES=on
```

```sh
$ git clone https://github.com/murosan/shogi-board-server
$ cd shogi-board-server
$ make build
# main というファイルが生成されます
```

> ブラウザから将棋ソフトを直接実行することはできません。  
> そのため、将棋ソフトは `shogi-board-server` から起動し、
> その出力結果を API を通して `Shogi Board` 側に取り込むことで
> ブラウザから操作できるという仕組みです。

## 3. 設定ファイルを作成する

将棋ソフトの名前と実行パスが書かれた、設定ファイルを `YAML` で作成します。  
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

## 4. shogi-board-server を立ち上げる

以下の例を参考にサーバーを起動します

```sh
$ ./sbserver-1.0.0 -appConfig ./app.config.yml
```

```sh
# 自分でビルドした場合以下のように起動できます
#
# ./main は生成された実行ファイル
# ./config/app.config.yml は 3 で作成した設定ファイル
$ ./main -appConfig ./config/app.config.yml
```

## 5. Shogi Board をブラウザで開く

[Getting Started](getting-started) を参考にブラウザで開きます

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
5. 「思考開始」をクリックで完了
