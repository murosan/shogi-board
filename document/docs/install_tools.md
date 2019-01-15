---
id: install_tools
title: 各種ツールのインストール方法
---

Shogi Board をセットアップするために必要な各種ツールのインストール方法一覧です。  
不明な点などがあれば、お気軽に [issue](https://github.com/murosan/shogi-board/issues) へどうぞ！。

- [title: 各種ツールのインストール方法](#title-%E5%90%84%E7%A8%AE%E3%83%84%E3%83%BC%E3%83%AB%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E6%96%B9%E6%B3%95)
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

1. 以下の URL より、「インストール」のすぐ下に書いてあるスクリプトをコピーします  
   <https://brew.sh/index_ja>

   2019/01/15 現在は以下のスクリプトです

   ```ruby
   /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
   ```

2. ターミナルを開きます
3. ターミナルに、コピーしたスクリプトを貼り付けて `Enter`

## Node.js

#### macOS

Homebrew がインストールされている前提です([インストール方法](#homebrew))

1. ターミナルを開きます
2. `nodeberw` をインストールし、`PATH`を通します

```sh
$ brew install nodebrew
$ echo 'export PATH=$HOME/.nodebrew/current/bin:$PATH' >> ~/.bash_profile
$ source ~/.bash_profile
$ nodebrew -v
nodebrew 0.9.7
# (略)
```

3. `Node.js` をインストールします

```sh
$ nodebrew install-binary v10.14.1
# 数分かかる
$ use v10.14.1
$ node -v
v10.14.1
```

#### windows

Help wanted

## Yarn

`npm` と同じパッケージマネージャです。  
`npm` より高速に動作します（今はほとんど差がないですが）。

#### macOS

Homebrew がインストールされている前提です([インストール方法](#homebrew))

```sh
$ brew install yarn
```

#### Windows

Help wanted
