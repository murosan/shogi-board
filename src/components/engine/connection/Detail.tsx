import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { EngineState, Thinking } from '../../../model/engine/EngineState'
import { ShogiBoardClient } from '../../../proto/factory'
import { Store } from '../../../store/GameStateStore'
import './Detail.scss'
import Buttons from './form/Buttons'
import Checks from './form/Checks'
import Ranges from './form/Ranges'
import Selects from './form/Selects'
import Texts from './form/Texts'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class Detail extends Component<Props> {
  render() {
    const { current, options }: EngineState = this.props.store!.engineState
    if (!current || !options) return <div />

    const sbclient: ShogiBoardClient = new ShogiBoardClient(current)
    const { buttons, checks, spins, selects, strings, filenames } = options
    return (
      <div className="DetailContainer">
        <h1 className="EngineName">{current}</h1>
        {this.renderDisconnectButton()}
        {this.renderStartButton(sbclient)}
        <h2 className="EngineOption">オプション</h2>
        <Buttons buttons={buttons} sbclient={sbclient} />
        <Checks checks={checks} sbclient={sbclient} />
        <Ranges ranges={spins} sbclient={sbclient} />
        <Selects selects={selects} sbclient={sbclient} />
        <Texts strings={strings} filenames={filenames} sbclient={sbclient} />
        {this.renderDisconnectButton()}
        {this.renderStartButton(sbclient)}
      </div>
    )
  }

  private renderDisconnectButton() {
    const onClick = () => {
      console.log('disconnect')
      this.props.store!.unsetCurrentEngine()
    }
    return (
      <button className="ButtonDisconnect" onClick={onClick}>
        接続解除
      </button>
    )
  }

  private renderStartButton(sbclient: ShogiBoardClient) {
    const onClick = async () => {
      console.log('start thinking')
      await sbclient.start()
      await this.props.store!.setEngineState(Thinking)
      await this.props.store!.closeEngineController()
    }
    return (
      <button className="ButtonStartThinking" onClick={onClick}>
        思考開始
      </button>
    )
  }
}
