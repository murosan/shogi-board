import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { columnString, rowString } from '../../lib/strings'
import { find } from '../../lib/validatior/utils/algorithm'
import { ClickProps } from '../../model/events/ClickProps'
import Confirm from '../../model/shogi/Confirm'
import { Empty, Piece } from '../../model/shogi/Piece'
import Point from '../../model/shogi/Point'
import { Gote, Sente, Turn } from '../../model/shogi/Turn'
import { Store } from '../../model/store/Store'
import './Cell.scss'

export interface Props {
  store?: Store
  row: number
  column: number
}

@inject('store')
@observer
export default class Cell extends Component<Props> {
  getPiece = () => {
    const { row, column, store } = this.props
    const isOnBoard: boolean = inRange(row) && inRange(column)
    if (!isOnBoard) return Empty
    return store!.gameState.currentMove.pos.pos[row][column]
  }

  render(): JSX.Element | undefined {
    const { row, column, store } = this.props
    const { config, gameState } = store!
    const { indexes, selected, confirm, currentMove, moveTargets } = gameState
    const piece: Piece = this.getPiece()

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
      <div className={className} onClick={() => this.click()}>
        {this.renderConfirm(confirm)}
        {this.renderEdgeTextRow()}
        {this.renderEdgeTextColumn()}
      </div>
    )
  }

  renderConfirm(cf: Confirm | null): JSX.Element | undefined {
    const { row, column, store } = this.props
    if (!cf || cf.row !== row || cf.column !== column) return

    const isReversed: boolean = store!.gameState.indexes[0] === 9
    const isGote =
      (isReversed && cf.preserved > 0) || (!isReversed && cf.preserved < 0)

    const className = 'Piece-Confirm Piece-Confirm' + Number(isGote)

    const promote = () => this.click(cf, true)
    const preserve = () => this.click(cf)

    // TODO: この方法だと画面幅によって1pxずれる
    return (
      <div className={className}>
        <div className="Piece-Confirm-Promote" onClick={promote} />
        <div className="Piece-Confirm-Preserve" onClick={preserve} />
      </div>
    )
  }

  renderEdgeTextRow(): JSX.Element | undefined {
    const { row, column } = this.props
    const needText = inRange(column) && row === -1
    if (needText) return <span>{columnString(column)}</span>
  }

  renderEdgeTextColumn(): JSX.Element | undefined {
    const { row, column } = this.props
    const needText = inRange(row) && column === -1
    if (needText) return <span>{rowString(row)}</span>
  }

  click(cf?: Confirm, promote?: true) {
    const { row, column, store } = this.props
    if (store!.gameState.confirm && !cf) return
    const clicked: Confirm | Piece = cf || this.getPiece()
    const p: ClickProps = { clicked, row, column, promote }
    store!.gameState.clickPiece(p)
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
    (p.c === -1 && rowInRange) || (p.r === -1 && colInRange)
      ? 'Cell-EdgeText '
      : ''
  const star: string = isStar ? 'Piece-Star' : ''

  return `Cell ${piece}${pieceImg}${pieceTurn}${pieceSelected}${pieceTargeted}${left}${top}${edgeText}${star}`
}

function inRange(n: number): boolean {
  return 0 <= n && n <= 8
}
