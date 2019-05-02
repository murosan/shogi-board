import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { Gote, Sente } from '../../model/shogi/Turn'
import { Store } from '../../model/store/Store'
import Buttons from './Buttons'
import Captures from './Captures'
import './LeftSide.scss'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class LeftSide extends Component<Props> {
  render() {
    const { indexes, currentMove } = this.props.store!.gameState
    const { turn, cap0, cap1 } = currentMove.pos
    const caps: number[] = indexes[0] === -1 ? cap1 : cap0
    const isTurn: boolean = indexes[0] === -1 ? turn === Gote : turn === Sente

    return (
      <div className="LeftSide">
        <Captures isLeftSide={true} captures={caps} isTurn={isTurn} />
        <div className="LeftInfo">
          <div />
          <Buttons />
        </div>
      </div>
    )
  }
}
