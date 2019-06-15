import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { MockupHidden } from '../../../model/display/MockupState'
import { EngineState } from '../../../model/engine/EngineState'
import { Connecting, NotConnected } from '../../../model/engine/State'
import { Store } from '../../../model/store/Store'
import CloseButton from '../../util/CloseButton'
import Detail from './Detail'
import List from './List'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class Controller extends Component<Props> {
  render() {
    const { engineState }: Store = this.props.store!
    const { state }: EngineState = engineState

    // 接続前なら将棋エンジンの一覧画面を出す
    const isList: boolean = state === NotConnected || state === Connecting
    const child: JSX.Element = isList ? <List /> : <Detail />

    return (
      <div className="Mockup">
        <CloseButton onClick={this.close} />
        {child}
      </div>
    )
  }

  private close = () =>
    this.props.store!.displayState.setMockupState(MockupHidden)
}
