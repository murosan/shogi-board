---
id: install_tools
title: 各種ツールのインストール方法(macOS)
---

Shogi Board をセットアップするために必要な各種ツールのインストール方法一覧です。  
不明な点などがあれば、お気軽に
<u>[issue](https://github.com/murosan/shogi-board/issues)</u> へどうぞ。

- [Git](#git)
  - [macOS](#macos)
- [Homebrew](#homebrew)
- [Node.js](#nodejs)
  - [macOS](#macos-1)
- [Yarn](#yarn)
  - [macOS](#macos-2)

## Git

#### macOS

macOS にはデフォルトで Git がインストールされています。

## Homebrew

Homebrew とは、macOS 用のパッケージマネージャです。  
これを利用すると様々な開発ツールを簡単にインストールできるため、何も考えずに入れておくと良いです。

1. 以下の URL より、「インストール」の直下にあるスクリプトをコピーします  
   <u>https://brew.sh/index_ja</u>

   2020 年 7 月 現在は以下のスクリプトです

   ```ruby
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
   ```

2. ターミナルを開きます
3. ターミナルに、コピーしたスクリプトを貼り付けて `Enter`

## Node.js

#### macOS

Homebrew がインストールされている前提です(<u>[インストール方法](#homebrew)</u>)

1. ターミナルを開きます
2. `nodeberw` をインストールし、`PATH`を通します

```sh
$ brew install nodebrew
$ echo 'export PATH=$HOME/.nodebrew/current/bin:$PATH' >> ~/.bash_profile
$ source ~/.bash_profile
$ nodebrew setup
$ nodebrew -v
nodebrew 1.0.1
# (略)
```

3. `Node.js` をインストールします

```sh
$ nodebrew install-binary v14.19.3
$ use v14.19.3
$ node -v
v14.19.3
```

## Yarn

`npm` と同じパッケージマネージャです。

#### macOS

Homebrew がインストールされている前提です(<u>[インストール方法](#homebrew)</u>)

```sh
$ brew install yarn
```
