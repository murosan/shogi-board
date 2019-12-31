---
id: install_tools
title: 各種ツールのインストール方法
---

Shogi Board をセットアップするために必要な各種ツールのインストール方法一覧です。  
不明な点などがあれば、お気軽に
<u>[issue](https://github.com/murosan/shogi-board/issues)</u> へどうぞ。

- [Git](#git)
  - [macOS](#macos)
  - [Windows](#windows)
- [Homebrew](#homebrew)
- [Node.js](#nodejs)
  - [macOS](#macos-1)
  - [windows](#windows)
- [Yarn](#yarn)
  - [macOS](#macos-2)
  - [Windows](#windows-1)

## Git

#### macOS

macOS にはデフォルトで Git がインストールされています。

#### Windows

Help wanted

## Homebrew

Homebrew とは、macOS 用のパッケージマネージャです。  
これを利用すると様々な開発ツールを簡単にインストールできるため、何も考えずに入れておくと良いです。

1. 以下の URL より、「インストール」の直下にあるスクリプトをコピーします  
   <u>https://brew.sh/index_ja</u>

   2019/01/15 現在は以下のスクリプトです

   ```ruby
   /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
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
$ nodebrew install-binary v13.5.0
$ use v13.5.0
$ node -v
v13.5.0
```

#### windows

Help wanted

## Yarn

`npm` と同じパッケージマネージャです。

#### macOS

Homebrew がインストールされている前提です(<u>[インストール方法](#homebrew)</u>)

```sh
$ brew install yarn
```

#### Windows

Help wanted
