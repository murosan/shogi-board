import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
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
import { Turn } from '../../model/shogi/Turn'
import { StoreContext } from '../../store/Store'
import './Captures.scss'

export interface Props {
  isLeftSide: boolean
  captures: number[]
  isTurn: boolean
}

const Captures: FC<Props> = (props: Props) => {
  const { gameState } = React.useContext(StoreContext)
  const { selected, currentMove } = gameState

  const { captures, isLeftSide, isTurn } = props
  const className: string = 'Captures Captures' + Number(isLeftSide)

  return (
    <div className={className}>
      {cells('Hisha', Hisha0, captures[6])}
      {cells('Kaku', Kaku0, captures[5])}
      {cells('Kin', Kin0, captures[4])}
      {cells('Gin', Gin0, captures[3])}
      {cells('Kei', Kei0, captures[2])}
      {cells('Kyou', Kyou0, captures[1])}
      {cells('Fu', Fu0, captures[0])}
    </div>
  )

  function cells(name: string, pieceId: Piece, count: number): JSX.Element {
    const turn: Turn = currentMove.pos.turn

    const children = Array.from(Array(count).keys()).map(i => {
      const selectedClass = isTurn ? getSelectedClass(pieceId, i) : ''
      const isTurnClass = isTurn ? 'Piece-Turn' : ''
      const piece = isLeftSide ? -pieceId : pieceId
      const sideNumber = Number(isLeftSide)
      const captureClass = `Capture-${pieceId}${sideNumber}${count}${i + 1}`
      const className = `Piece Piece-${piece} ${isTurnClass} ${selectedClass} ${captureClass}`
      const key = `Cap-${sideNumber}-${name}-${i}`

      const onClick = () => {
        if (!isTurn) return
        const clicked: number = turn * pieceId
        gameState.clickPiece({ clicked, row: -1, column: -1, i })
      }
      return <div key={key} className={className} onClick={onClick} />
    })
    const className = `Captures-Inner Captures-${name}`
    return <div className={className}>{children}</div>
  }

  function getSelectedClass(pieceId: Piece, index: number): string {
    return !!selected &&
      selected.piece &&
      selected.row === -1 &&
      selected.column === -1 &&
      Math.abs(selected.piece) === pieceId /* TODO: すげー嫌 */ &&
      selected.i === index
      ? 'Piece-Selected'
      : ''
  }
}

export default observer(Captures)
