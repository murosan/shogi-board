import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { EngineState } from '../../../model/engine/EngineState'
import { Store } from '../../../store/GameStateStore'
import './Detail.scss'
import Buttons from './form/Buttons'
import Checks from './form/Checks'
import Ranges from './form/Ranges'
import Selects from './form/Selects'
import Text from './form/Text'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class Detail extends Component<Props> {
  render() {
    const { current, options }: EngineState = this.props.store!.engineState
    if (!current || !options) return <div />

    const { buttons, checks, spins, selects, strings, filenames } = options
    return (
      <div className="DetailContainer">
        <h1 className="EngineName">{current}</h1>
        <div>
          <button
            className="ButtonDisconnect"
            onClick={() => this.disconnect()}
          >
            接続解除
          </button>
        </div>
        <div className="OptionContainer">
          <h3 className="OptionType">Button</h3>
          <Buttons buttons={buttons} />
        </div>
        <div className="OptionContainer">
          <h3 className="OptionType">Check</h3>
          <Checks checks={checks} />
        </div>
        <div className="OptionContainer">
          <h3 className="OptionType">Range</h3>
          <Ranges ranges={spins} />
        </div>
        <div className="OptionContainer">
          <h3 className="OptionType">Select</h3>
          <Selects selects={selects} />
        </div>
        <div className="OptionContainer">
          <h3 className="OptionType">String・Filename</h3>
          <Text strings={strings} filenames={filenames} />
        </div>
      </div>
    )
  }

  disconnect() {
    console.log('disconnect')
  }
}
