import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { EngineState } from '../../../model/engine/EngineState'
import { Store } from '../../../store/GameStateStore'
import './Detail.scss'
import Buttons from './form/Buttons'

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
    // TODO
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
          <Buttons
            buttons={buttons}
            onClick={name => this.updateButton(name)}
          />
        </div>
        <div className="OptionContainer">
          <h3 className="OptionType">Check</h3>
        </div>
        <div className="OptionContainer">
          <h3 className="OptionType">Range</h3>
        </div>
        <div className="OptionContainer">
          <h3 className="OptionType">Select</h3>
        </div>
        <div className="OptionContainer">
          <h3 className="OptionType">String</h3>
        </div>
      </div>
    )
  }

  disconnect() {
    console.log('disconnect')
  }

  updateButton(name: string) {
    console.log('update button', name)
  }
}
