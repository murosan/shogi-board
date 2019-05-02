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
import { Turn } from '../../model/shogi/Turn'
import { Store } from '../../model/store/Store'
import './Captures.scss'

export interface Props {
  store?: Store
  isLeftSide: boolean
  captures: number[]
  isTurn: boolean
}

@inject('store')
@observer
export default class Captures extends Component<Props> {
  render(): JSX.Element {
    const { captures, isLeftSide } = this.props
    const className: string = 'Captures Captures' + Number(isLeftSide)
    return (
      <div className={className}>
        {this.cells('Hisha', Hisha0, captures[6])}
        {this.cells('Kaku', Kaku0, captures[5])}
        {this.cells('Kin', Kin0, captures[4])}
        {this.cells('Gin', Gin0, captures[3])}
        {this.cells('Kei', Kei0, captures[2])}
        {this.cells('Kyou', Kyou0, captures[1])}
        {this.cells('Fu', Fu0, captures[0])}
      </div>
    )
  }

  cells(name: string, pieceId: Piece, count: number): JSX.Element {
    const { store, isTurn, isLeftSide } = this.props
    const { selected } = store!.gameState
    const turn: Turn = store!.gameState.currentMove.pos.turn

    const children = Array.from(Array(count).keys()).map(i => {
      const selectedClass = isTurn ? getSelectedClass(selected, pieceId, i) : ''
      const isTurnClass = isTurn ? 'Piece-Turn' : ''
      const piece = isLeftSide ? -pieceId : pieceId
      const sideNumber = Number(isLeftSide)
      const captureClass = `Capture-${pieceId}${sideNumber}${count}${i + 1}`
      const className = `Piece Piece-${piece} ${isTurnClass} ${selectedClass} ${captureClass}`
      const key = `Cap-${sideNumber}-${name}-${i}`

      const onClick = () => {
        if (!isTurn) return
        const clicked: number = turn * pieceId
        store!.gameState.clickPiece({ clicked, row: -1, column: -1, i })
      }
      return <div key={key} className={className} onClick={onClick} />
    })
    const className = `Captures-Inner Captures-${name}`
    return <div className={className}>{children}</div>
  }
}

function getSelectedClass(
  selected: Point | null,
  pieceId: Piece,
  index: number
): string {
  return !!selected &&
  selected.piece &&
  selected.row === -1 &&
  selected.column === -1 &&
  Math.abs(selected.piece) === pieceId /* TODO: すげー嫌 */ &&
    selected.i === index
    ? 'Piece-Selected'
    : ''
}
