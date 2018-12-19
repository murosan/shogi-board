import React, { Component } from 'react'
import { ClickFunc } from '../../model/events/ClickFunc'
import GameState from '../../model/shogi/GameState'
import Board from './Board'
import './BoardArea.scss'
import LeftSide from './LeftSide'
import RightSide from './RightSide'

export interface Props {
  gs: GameState
  click: ClickFunc
}

export default class BoardArea extends Component<Props, {}> {
  render() {
    const gs: GameState = this.props.gs
    const turn: 1 | -1 = this.props.gs.pos.turn
    const isReversed: boolean = gs.indexes[0] === 9
    const cap0: number[] = gs.pos.cap0
    const cap1: number[] = gs.pos.cap1

    return (
      <div className="BoardArea">
        <LeftSide
          click={this.props.click}
          captures={isReversed ? cap0 : cap1}
          isTurn={isReversed ? turn === 1 : turn === -1}
          turn={this.props.gs.pos.turn}
          selected={this.props.gs.selected}
        />
        <Board gs={this.props.gs} click={this.props.click} />
        <RightSide
          click={this.props.click}
          captures={isReversed ? cap1 : cap0}
          isTurn={isReversed ? turn === -1 : turn === 1}
          turn={this.props.gs.pos.turn}
          selected={this.props.gs.selected}
        />
      </div>
    )
  }
}
