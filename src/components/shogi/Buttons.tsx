import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { config } from '../../config/Config'
import { getHostname } from '../../lib/dom-handler/url'
import { getAsString } from '../../lib/kif-handler/getAsString'
import { Store } from '../../store/GameStateStore'
import './Buttons.scss'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class Buttons extends Component<Props> {
  render(): JSX.Element {
    const i: number = this.props.store!.currentMove.index
    return (
      <div className="ButtonsContainer">
        <button
          className="PrevOne"
          onClick={() => this.props.store!.clickKif(i - 1 < 0 ? 0 : i - 1)}
        >
          ＜
        </button>
        <button
          className="NextOne"
          onClick={() => this.props.store!.clickKif(i + 1)}
        >
          ＞
        </button>
        <button
          className="PrevFive"
          onClick={() => this.props.store!.clickKif(i - 5 < 0 ? 0 : i - 5)}
        >
          ＜ 5
        </button>
        <button
          className="NextFive"
          onClick={() => this.props.store!.clickKif(i + 5)}
        >
          5 ＞
        </button>
        <button className="Reverse" onClick={() => this.props.store!.reverse()}>
          盤面反転
        </button>
        <button
          className="Copy"
          data-clipboard-text={getAsString(this.props.store!.kif)}
        >
          棋譜コピー
        </button>
        <button
          className="ConnectToEngine"
          onClick={() => this.connectToEngine()}
        >
          将棋エンジン
        </button>
      </div>
    )
  }

  connectToEngine(): void {
    const docsURL = 'https://murosan.github.io/shogi-board/'
    const docsIsHere = `ドキュメントはこちら`
    if (getHostname() === 'murosan.github.io') {
      this.props.store!.setMessages([
        'Playground では使用できません。各自PCにダウンロードしてご利用ください。',
        docsIsHere,
        docsURL,
      ])
      return
    }

    if (!config.serverURL) {
      this.props.store!.setMessages([
        'serverURL を設定してください。',
        docsIsHere,
        docsURL,
      ])
      return
    }

    this.props.store!.connectEngine()
  }
}
