import React, { Component } from 'react'
import { ClickFunc } from '../../model/events/ClickFunc'
import Point from '../../model/shogi/Point'
import { Turn } from '../../model/shogi/Turn'
import Captures from './Captures'
import './RightSide.scss'

export interface Props {
  click: ClickFunc
  captures: number[]
  isTurn: boolean
  turn: Turn
  selected?: Point
}

export default class RightSide extends Component<Props, {}> {
  render() {
    return (
      <div className="RightSide">
        <div />
        <Captures
          click={this.props.click}
          isLeftSide={false}
          captures={this.props.captures}
          isTurn={this.props.isTurn}
          turn={this.props.turn}
          selected={this.props.selected}
        />
      </div>
    )
  }
}
