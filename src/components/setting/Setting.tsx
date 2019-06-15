import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { MockupHidden } from '../../model/display/MockupState'
import { Store } from '../../model/store/Store'
import CloseButton from '../util/CloseButton'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class Setting extends Component<Props> {
  render() {
    return (
      <div className="Mockup">
        <CloseButton onClick={this.close} />
        <div>設定</div>
      </div>
    )
  }

  private close = () =>
    this.props.store!.displayState.setMockupState(MockupHidden)
}
