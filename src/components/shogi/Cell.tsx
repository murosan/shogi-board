import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { find } from '../../lib/validatior/utils/algorithm'
import { ClickProps } from '../../model/events/ClickProps'
import Confirm from '../../model/shogi/Confirm'
import { Empty, Piece } from '../../model/shogi/Piece'
import Point from '../../model/shogi/Point'
import { Gote, Sente, Turn } from '../../model/shogi/Turn'
import { StoreContext } from '../../store/Store'
import './Cell.scss'

export interface Props {
  row: number
  column: number
}

const Cell: FC<Props> = (props: Props) => {
  const { gameState, config } = React.useContext(StoreContext)
  const { indexes, selected, confirm, currentMove, moveTargets } = gameState
  const { row, column } = props

  const getPiece = () => {
    const isOnBoard: boolean = inRange(row) && inRange(column)
    if (!isOnBoard) return Empty
    return gameState.currentMove.pos.pos[row][column]
  }

  const piece: Piece = getPiece()

  const turn: Turn = currentMove.pos.turn
  const isTurn: boolean =
    (piece > 0 && turn === Sente) || (piece < 0 && turn === Gote)

  // 着色する設定 && 駒が移動できるマスである
  const isTargeted =
    config.paintTargets && find(moveTargets, { row, column }) !== -1

  const className: string = getClassName({
    r: row,
    c: column,
    rv: indexes[0] === 9,
    p: piece,
    sel: selected,
    confirm: confirm,
    isTurn,
    isTargeted,
  })

  return (
    <div className={className} onClick={() => click()}>
      {renderConfirm(confirm)}
    </div>
  )

  function renderConfirm(cf: Confirm | null): JSX.Element | undefined {
    if (!cf || cf.row !== row || cf.column !== column) return

    const isReversed: boolean = indexes[0] === 9
    const isGote =
      (isReversed && cf.preserved > 0) || (!isReversed && cf.preserved < 0)

    const className = 'Piece-Confirm Piece-Confirm' + Number(isGote)

    const promote = () => click(cf, true)
    const preserve = () => click(cf)

    // TODO: この方法だと画面幅によって1pxずれる
    return (
      <div className={className}>
        <div className="Piece-Confirm-Promote" onClick={promote} />
        <div className="Piece-Confirm-Preserve" onClick={preserve} />
      </div>
    )
  }

  function click(cf?: Confirm, promote?: true) {
    if (confirm && !cf) return
    const clicked: Confirm | Piece = cf || getPiece()
    const p: ClickProps = { clicked, row, column, promote }
    gameState.clickPiece(p)
  }
}

interface GetClassNameProps {
  r: number // row
  c: number // column
  rv: boolean // isReversed
  p: Piece
  sel: Point | null // selected
  confirm: Confirm | null
  isTurn: boolean
  isTargeted: boolean
}

// つらい感じ
function getClassName(p: GetClassNameProps): string {
  if (
    !!p.confirm &&
    !!p.sel &&
    ((p.r === p.sel.row && p.c === p.sel.column) ||
      (p.r === p.confirm.row && p.c === p.confirm.column))
  ) {
    // TODO: ヒドス。あとで必ず修正すること!!
    p.p = Empty
  }

  const rowInRange: boolean = inRange(p.r)
  const colInRange: boolean = inRange(p.c)
  const isLeft: boolean =
    rowInRange && ((!p.rv && p.c === 8) || (p.rv && p.c === 0))
  const isTop: boolean =
    colInRange && ((!p.rv && p.r === 0) || (p.rv && p.r === 8))
  const isStar: boolean =
    (!p.rv &&
      ((p.r === 2 && p.c === 6) ||
        (p.r === 2 && p.c === 3) ||
        (p.r === 5 && p.c === 6) ||
        (p.r === 5 && p.c === 3))) ||
    (p.rv &&
      ((p.r === 6 && p.c === 2) ||
        (p.r === 6 && p.c === 5) ||
        (p.r === 3 && p.c === 2) ||
        (p.r === 3 && p.c === 5)))
  const isSelected: boolean =
    rowInRange &&
    colInRange &&
    !!p.sel &&
    p.sel.row === p.r &&
    p.sel.column === p.c

  const piece: string = rowInRange && colInRange ? 'Piece Piece-Bordered ' : ''
  const rvp: number | undefined = p.p && p.rv ? p.p * -1 : p.p
  const pieceImg: string = rvp ? `Piece-${rvp} ` : ''
  const pieceTurn: string = p.isTurn ? 'Piece-Turn ' : ''
  const pieceSelected: string = isSelected ? 'Piece-Selected ' : ''
  const pieceTargeted: string = p.isTargeted ? 'Piece-Targeted ' : ''
  const left: string = isLeft ? 'Piece-Left ' : ''
  const top: string = isTop ? 'Piece-Top ' : ''
  const edgeText: string =
    (p.c === -1 && rowInRange) || (p.r === -1 && colInRange) ? 'Cell-Edge ' : ''
  const edgeTextColumn =
    inRange(p.c) && p.r === -1 ? `Edge-Column-${p.c + 1} ` : ''
  const edgeTextRow = inRange(p.r) && p.c === -1 ? `Edge-Row-${p.r + 1} ` : ''
  const star: string = isStar ? 'Piece-Star' : ''

  return `Cell ${piece}${pieceImg}${pieceTurn}${pieceSelected}${pieceTargeted}${left}${top}${edgeText}${edgeTextRow}${edgeTextColumn}${star}`
}

function inRange(n: number): boolean {
  return 0 <= n && n <= 8
}

export default observer(Cell)
