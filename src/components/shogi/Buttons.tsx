import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { config } from '../../config/Config'
import { getHostname } from '../../lib/dom-handler/url'
import { getAsString } from '../../lib/kif-handler/getAsString'
import { Store } from '../../store/GameStateStore'
import './Buttons.scss'
import { Thinking, StandBy } from '../../model/engine/EngineState'
import { ShogiBoardClient } from '../../proto/factory'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class Buttons extends Component<Props> {
  render(): JSX.Element {
    const { currentMove, engineState } = this.props.store!
    const i: number = currentMove.index

    const engineIsThinking: boolean = engineState.state === Thinking
    const engineButtonText: string = engineIsThinking
      ? '思考停止'
      : '将棋エンジン'
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
          onClick={() => this.engineOnClick()}
        >
          {engineButtonText}
        </button>
      </div>
    )
  }

  private async engineOnClick(): Promise<void> {
    const { engineState } = this.props.store!
    const { current, state } = engineState
    if (!current || state !== Thinking) return this.connectToEngine()

    new ShogiBoardClient(current).stop()
    this.props.store!.setEngineState(StandBy)
  }

  private async connectToEngine(): Promise<void> {
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

    this.props.store!.showEngineController()
  }
}
