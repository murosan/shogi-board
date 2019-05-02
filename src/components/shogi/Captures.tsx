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
    return (
      <div className={'Captures Captures' + Number(isLeftSide)}>
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

    const children = Array.from(Array(count).keys()).map(i => {
      const selectedClass = isTurn ? getSelectedClass(selected, pieceId, i) : ''
      const isTurnClass = isTurn ? 'Piece-Turn' : ''
      const piece = isLeftSide ? -pieceId : pieceId
      const sideNumber = Number(isLeftSide)
      const captureClass = `Capture-${pieceId}${sideNumber}${count}${i + 1}`
      const className = `Piece Piece-${piece} ${isTurnClass} ${selectedClass} ${captureClass}`
      return (
        <div
          key={`Cap-${sideNumber}-${name}-${i}`}
          className={className}
          onClick={() => {
            if (isTurn)
              store!.gameState.clickPiece({
                clicked: Math.abs(pieceId),
                row: -1,
                column: -1,
                i,
              })
          }}
        />
      )
    })
    return <div className={`Captures-Inner Captures-${name}`}>{children}</div>
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
