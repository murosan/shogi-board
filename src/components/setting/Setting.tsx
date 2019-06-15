import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { MockupHidden } from '../../model/display/MockupState'
import { Store } from '../../model/store/Store'
import Text from '../form/Text'
import CloseButton from '../util/CloseButton'
import Check from '../form/Check'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class Setting extends Component<Props> {
  render() {
    const { config } = this.props.store!
    const { paintTargets, serverURL, saveToCookie } = config
    return (
      <div className="Mockup">
        <CloseButton onClick={this.close} />
        <h1>設定</h1>
        <Text
          label="shogi-board-server の URL"
          value={serverURL}
          allowEmpty={true}
          onChange={s => config.setServerURL(s)}
          placeholder="(例)http://localhost:8080"
        />
        <Check
          label="駒が移行できるマスに色を付ける"
          value={paintTargets}
          name="PaintTargets"
          onChange={b => config.setPaintTargets(b)}
        />
        <Check
          label="Cookie に設定を保存する"
          value={saveToCookie}
          name="SaveToCookie"
          onChange={b => config.setSaveToCookie(b)}
        />
      </div>
    )
  }

  private close = () =>
    this.props.store!.displayState.setMockupState(MockupHidden)
}
