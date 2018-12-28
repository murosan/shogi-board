import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { Gote, Sente } from '../../model/shogi/Turn'
import GameStateStore from '../../store/game-state.store'
import Captures from './Captures'
import './LeftSide.scss'

export interface Props {
  gs?: GameStateStore
}

@inject('gs')
@observer
export default class LeftSide extends Component<Props> {
  render() {
    const caps: number[] =
      this.props.gs!.indexes[0] === -1
        ? this.props.gs!.pos.cap1
        : this.props.gs!.pos.cap0

    const isTurn: boolean =
      this.props.gs!.indexes[0] === -1
        ? this.props.gs!.pos.turn === Gote
        : this.props.gs!.pos.turn === Sente

    return (
      <div className="LeftSide">
        <Captures isLeftSide={true} captures={caps} isTurn={isTurn} />
        <div />
      </div>
    )
  }
}
