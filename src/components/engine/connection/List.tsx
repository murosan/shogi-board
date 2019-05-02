import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { Connecting, NotConnected, State } from '../../../model/engine/State'
import { Store } from '../../../model/store/Store'
import { ShogiBoardClient } from '../../../proto/factory'
import Loader from '../../util/Loader'
import './List.scss'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class List extends Component<Props> {
  render() {
    const { names, current, state } = this.props.store!.engineState
    if (names.length === 0)
      return (
        <div className="ListEngineName">
          <span>利用可能な将棋エンジンが設定されていません</span>
        </div>
      )

    return names.map((name, i) => {
      const isCurrent: boolean = name === current
      const loading: boolean = isCurrent && state === Connecting
      const loader = loading ? <Loader /> : undefined
      const onClick = () => this.setCurrentEngine(name, state)
      return (
        <div className="ListEngineName" key={i} onClick={onClick}>
          {loader}
          <span>{name}</span>
        </div>
      )
    })
  }

  private async setCurrentEngine(name: string, state: State): Promise<void> {
    if (state !== NotConnected) return
    await this.props.store!.engineState.connect(name)
  }

  componentWillMount() {
    const { engineState }: Store = this.props.store!
    new ShogiBoardClient()
      .initialize()
      .then((list: string[]) => engineState.setNames(list))
      .catch(err => {
        const msg = 'Failed to initialize.'
        console.error(msg, err)
        engineState.disconnect()
        alert(msg)
      })
  }
}
