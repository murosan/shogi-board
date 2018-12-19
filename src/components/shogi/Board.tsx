import React, { Component } from 'react'
import { ClickFunc } from '../../model/events/ClickFunc'
import GameState from '../../model/shogi/GameState'
import { Piece } from '../../model/shogi/Piece'
import './Board.scss'
import Cell from './Cell'

export interface Props {
  gs: GameState
  click: ClickFunc
}

export default class Board extends Component<Props, {}> {
  render() {
    const idx = this.props.gs.indexes
    const rows = idx.map(r =>
      idx
        .slice()
        .reverse()
        .map(c => {
          const p: Piece | undefined = inRange(r, c)
            ? this.props.gs.pos.pos[r][c]
            : undefined
          const isTurn: boolean = !!(p && isOwner(this.props.gs.pos.turn, p))
          return (
            <Cell
              key={`cell:${r}${c}`}
              row={r}
              column={c}
              piece={p}
              isReversed={idx[0] === 9}
              isTurn={isTurn}
              selected={this.props.gs.selected}
              click={this.props.click}
            />
          )
        })
    )
    return (
      <div className="BoardContainer">
        <div className="Board">{rows}</div>
      </div>
    )
  }
}

function inRange(row: number, colum: number): boolean {
  return 0 <= row && row <= 8 && 0 <= colum && colum <= 8
}

function isOwner(turn: 1 | -1, p: Piece): boolean {
  return (p > 0 && turn === 1) || (p < 0 && turn === -1)
}
