import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { EngineState } from '../../../model/engine/EngineState'
import { Connecting, NotConnected } from '../../../model/engine/State'
import { Store } from '../../../model/store/Store'
import './Controller.scss'
import Detail from './Detail'
import List from './List'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class Controller extends Component<Props> {
  render() {
    const engineState: EngineState = this.props.store!.engineState
    const { state }: EngineState = engineState

    // 接続前なら将棋エンジンの一覧画面を出す
    const isList: boolean = state === NotConnected || state === Connecting
    const child: JSX.Element = isList ? <List /> : <Detail />

    const width = 20
    const line = (x1: number, y1: number, x2: number, y2: number) => (
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="2" />
    )
    return (
      <div className="ControllerBoard">
        <div onClick={() => engineState.closeController()}>
          <svg width={width} height={width} className="ControllerCloseButton">
            {line(0, 0, width, width)}
            {line(width, 0, 0, width)}
          </svg>
        </div>

        {child}
      </div>
    )
  }
}
