import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { Gote, Sente } from '../../model/shogi/Turn'
import { Store } from '../../store/GameStateStore'
import Captures from './Captures'
import Kif from './Kif'
import './RightSide.scss'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class RightSide extends Component<Props> {
  render() {
    const caps: number[] =
      this.props.store!.indexes[0] === 9
        ? this.props.store!.pos.cap1
        : this.props.store!.pos.cap0

    const isTurn: boolean =
      this.props.store!.indexes[0] === 9
        ? this.props.store!.pos.turn === Gote
        : this.props.store!.pos.turn === Sente

    return (
      <div className="RightSide">
        <div className="RightInfo">
          <Kif />
        </div>
        <Captures isLeftSide={false} captures={caps} isTurn={isTurn} />
      </div>
    )
  }
}
