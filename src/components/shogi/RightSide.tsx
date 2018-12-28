import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import GameState from '../../model/shogi/GameState'
import { Gote, Sente } from '../../model/shogi/Turn'
import Captures from './Captures'
import './RightSide.scss'

export interface Props {
  gs?: GameState
}

@inject('gs')
@observer
export default class RightSide extends Component<Props> {
  render() {
    const caps: number[] =
      this.props.gs!.indexes[0] === 9
        ? this.props.gs!.pos.cap1
        : this.props.gs!.pos.cap0

    const isTurn: boolean =
      this.props.gs!.indexes[0] === 9
        ? this.props.gs!.pos.turn === Gote
        : this.props.gs!.pos.turn === Sente

    return (
      <div className="RightSide">
        <div />
        <Captures isLeftSide={false} captures={caps} isTurn={isTurn} />
      </div>
    )
  }
}
