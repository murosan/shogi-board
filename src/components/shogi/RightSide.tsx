import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { Gote, Sente } from '../../model/shogi/Turn'
import { Store } from '../../model/store/Store'
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
    const { indexes, currentMove } = this.props.store!.gameState
    const { turn, cap0, cap1 } = currentMove.pos
    const caps: number[] = indexes[0] === 9 ? cap1 : cap0
    const isTurn: boolean = indexes[0] === 9 ? turn === Gote : turn === Sente

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
