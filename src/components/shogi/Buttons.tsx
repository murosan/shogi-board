import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { config } from '../../config/Config'
import { getAsString } from '../../lib/kif-handler/getAsString'
import {
  MockupEngineControl,
  MockupServerSetting,
  MockupSetting,
} from '../../model/display/MockupState'
import { Thinking } from '../../model/engine/State'
import { Store } from '../../model/store/Store'
import './Buttons.scss'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class Buttons extends Component<Props> {
  render(): JSX.Element {
    const { gameState, engineState } = this.props.store!
    const { currentMove, kif } = gameState
    const i: number = currentMove.index

    const engineIsThinking: boolean = engineState.state === Thinking
    const engineButtonText: string = engineIsThinking
      ? '思考停止'
      : '将棋エンジン'

    const prevOne: number = i - 1 < 0 ? 0 : i - 1
    const nextOne: number = i + 1
    const prevFive: number = i - 5 < 0 ? 0 : i - 5
    const nextFive: number = i + 5

    return (
      <div className="ButtonsContainer">
        <button className="PrevOne" onClick={this.kifHandler(prevOne)}>
          ＜
        </button>
        <button className="NextOne" onClick={this.kifHandler(nextOne)}>
          ＞
        </button>
        <button className="PrevFive" onClick={this.kifHandler(prevFive)}>
          ＜ 5
        </button>
        <button className="NextFive" onClick={this.kifHandler(nextFive)}>
          5 ＞
        </button>
        <button className="Reverse" onClick={this.reverse}>
          盤面反転
        </button>
        <button className="Copy" data-clipboard-text={getAsString(kif)}>
          棋譜コピー
        </button>
        <button className="ConnectToEngine" onClick={this.engineOnClick}>
          {engineButtonText}
        </button>
        <button className="Configuration" onClick={this.showSetting}>
          設定
        </button>
      </div>
    )
  }

  private reverse = () => this.props.store!.gameState.reverse()

  private kifHandler = (i: number) => () =>
    this.props.store!.gameState.clickKif(i)

  private engineOnClick: () => Promise<void> = async () => {
    const { engineState } = this.props.store!
    const { current, state } = engineState
    if (!current || state !== Thinking) return await this.connectToEngine()
    await engineState.stopThinking()
  }

  private connectToEngine = async () => {
    const { displayState } = this.props.store!

    // サーバー URL が設定されてなかったら、設定画面を出す
    if (!config.serverURL)
      return await displayState.setMockupState(MockupServerSetting)

    await displayState.setMockupState(MockupEngineControl)
  }

  private showSetting = async () =>
    this.props.store!.displayState.setMockupState(MockupSetting)
}
