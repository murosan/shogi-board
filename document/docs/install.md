---
id: install
title: 開発者向け
---

GitHub リポジトリから close して使う方法を紹介します。開発者向けのページです

## 事前に必要なもの

Git・Node.js・Yarn  
インストール方法は [こちら](install_tools.md)

## Quick Start

```sh
$ git clone https://github.com/murosan/shogi-board.git
$ cd shogi-board
$ yarn
$ yarn start
```

## ドキュメントを編集する

```sh
$ cd shogi-board/document/website/
$ yarn start
```

Docusaurus という静的サイトジェネレータを使用しています。  
詳しくは [docusaurus.io](https://docusaurus.io/) を参照してください。

## shogi-board-server の Quick Start

```sh
$ git clone https://github.com/murosan/shogi-board-server.git
$ cd shogi-board-server
$ cp ./config/app_example.yml ./config/app.yml
# ./config/app.yml に記入する
$ go run main.go
```
