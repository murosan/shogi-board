import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { Store } from '../../../model/store/Store'
import { ShogiBoardClient } from '../../../proto/factory'
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
    const { current, options } = this.props.store!.engineState
    if (!current || !options) return <div />

    const sbclient: ShogiBoardClient = new ShogiBoardClient(current)
    const { buttons, checks, spins, selects, strings, filenames } = options

    const disconnectBtn = (
      <button className="ButtonDisconnect" onClick={this.disconnect}>
        接続解除
      </button>
    )

    const startBtn = (
      <button className="ButtonStartThinking" onClick={this.start}>
        思考開始
      </button>
    )

    return (
      <div className="DetailContainer">
        <h1 className="EngineName">{current}</h1>
        {disconnectBtn}
        {startBtn}
        <h2 className="EngineOption">オプション</h2>
        <Buttons buttons={buttons} sbclient={sbclient} />
        <Checks checks={checks} sbclient={sbclient} />
        <Ranges ranges={spins} sbclient={sbclient} />
        <Selects selects={selects} sbclient={sbclient} />
        <Texts strings={strings} filenames={filenames} sbclient={sbclient} />
        {disconnectBtn}
        {startBtn}
      </div>
    )
  }

  private disconnect = () => this.props.store!.engineState.disconnect()
  private start = () => this.props.store!.engineState.startThinking()
}
