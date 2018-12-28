import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import {
  Fu0,
  Gin0,
  Hisha0,
  Kaku0,
  Kei0,
  Kin0,
  Kyou0,
  Piece,
} from '../../model/shogi/Piece'
import Point from '../../model/shogi/Point'
import GameStateStore from '../../store/game-state.store'
import './Captures.scss'

export interface Props {
  gs?: GameStateStore
  isLeftSide: boolean
  captures: number[]
  isTurn: boolean
}

@inject('gs')
@observer
export default class Captures extends Component<Props> {
  render(): JSX.Element {
    return (
      <div className={'Captures Captures' + Number(this.props.isLeftSide)}>
        {this.cells('Hisha', Hisha0, this.props.captures[6])}
        {this.cells('Kaku', Kaku0, this.props.captures[5])}
        {this.cells('Kin', Kin0, this.props.captures[4])}
        {this.cells('Gin', Gin0, this.props.captures[3])}
        {this.cells('Kei', Kei0, this.props.captures[2])}
        {this.cells('Kyou', Kyou0, this.props.captures[1])}
        {this.cells('Fu', Fu0, this.props.captures[0])}
      </div>
    )
  }

  cells(name: string, pieceId: Piece, count: number): JSX.Element {
    const sel = this.props.gs!.selected
    const children = Array.from(Array(count).keys()).map(i => {
      const selectedClass = this.props.isTurn
        ? getSelectedClass(sel, pieceId, i)
        : ''
      const isTurnClass = this.props.isTurn ? 'Piece-Turn' : ''
      const piece = this.props.isLeftSide ? -pieceId : pieceId
      const sideNumber = Number(this.props.isLeftSide)
      const captureClass = `Capture-${pieceId}${sideNumber}${count}${i + 1}`
      const className = `Piece Piece-${piece} ${isTurnClass} ${selectedClass} ${captureClass}`
      return (
        <div
          key={`Cap-${this.props.isLeftSide}-${name}-${i}`}
          className={className}
          onClick={() => {
            if (this.props.isTurn)
              this.props.gs!.clickPiece({
                clicked: this.props.gs!.pos.turn * pieceId,
                row: -1,
                column: -1,
                i: i,
              })
          }}
        />
      )
    })
    return <div className={`Captures-Inner Captures-${name}`}>{children}</div>
  }
}

function getSelectedClass(
  selected: Point | undefined,
  pieceId: Piece,
  index: number
): string {
  return selected &&
  selected.piece &&
  selected.row === -1 &&
  selected.column === -1 &&
  Math.abs(selected.piece) === pieceId /* TODO: すげー嫌 */ &&
    selected.i === index
    ? 'Piece-Selected'
    : ''
}
