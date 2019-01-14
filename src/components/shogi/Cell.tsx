import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { columnString, rowString } from '../../lib/strings'
import { find } from '../../lib/validatior/utils/algorithm'
import { ClickProps } from '../../model/events/ClickProps'
import Confirm from '../../model/shogi/Confirm'
import { Empty, Piece } from '../../model/shogi/Piece'
import Point from '../../model/shogi/Point'
import { Gote, Sente } from '../../model/shogi/Turn'
import { Store } from '../../store/GameStateStore'
import './Cell.scss'

export interface Props {
  store?: Store
  row: number
  column: number
}

@inject('store')
@observer
export default class Cell extends Component<Props> {
  getPiece = () =>
    inRange(this.props.row) && inRange(this.props.column)
      ? this.props.store!.currentMove.pos.pos[this.props.row][this.props.column]
      : Empty

  render(): JSX.Element | undefined {
    const {
      indexes,
      selected,
      confirm,
      currentMove,
      moveTargets,
    } = this.props.store!
    const piece: Piece = this.getPiece()
    const row: number = this.props.row
    const column: number = this.props.column

    const isTurn: boolean =
      (piece > 0 && currentMove.pos.turn === Sente) ||
      (piece < 0 && currentMove.pos.turn === Gote)

    const className: string = getClassName({
      r: row,
      c: column,
      rv: indexes[0] === 9,
      p: piece,
      sel: selected,
      confirm: confirm,
      isTurn,
      isTargeted: find(moveTargets, { row, column }) !== -1,
    })

    return (
      <div className={className} onClick={() => this.click()}>
        {this.renderConfirm(confirm)}
        {this.renderEdgeTextRow()}
        {this.renderEdgeTextColumn()}
      </div>
    )
  }

  renderConfirm(cf?: Confirm): JSX.Element | undefined {
    const row: number = this.props.row
    const column: number = this.props.column
    if (!cf || cf.row !== row || cf.column !== column) return undefined

    const isReversed: boolean = this.props.store!.indexes[0] === 9
    const isGote =
      (isReversed && cf.preserved > 0) || (!isReversed && cf.preserved < 0)

    const className = 'Piece-Confirm Piece-Confirm' + Number(isGote)

    // TODO: この方法だと画面幅によって1pxずれる
    return (
      <div className={className}>
        <div
          className="Piece-Confirm-Promote"
          onClick={() => this.click(cf, true)}
        />
        <div
          className="Piece-Confirm-Preserve"
          onClick={() => this.click(cf)}
        />
      </div>
    )
  }

  renderEdgeTextRow(): JSX.Element | undefined {
    const needText = inRange(this.props.column) && this.props.row === -1
    if (!needText) return undefined

    return <span>{columnString(this.props.column)}</span>
  }

  renderEdgeTextColumn(): JSX.Element | undefined {
    const needText = inRange(this.props.row) && this.props.column === -1
    if (!needText) return undefined

    return <span>{rowString(this.props.row)}</span>
  }

  click(cf?: Confirm, promote?: true) {
    if (this.props.store!.confirm && !cf) return
    const p: ClickProps = {
      clicked: cf || this.getPiece(),
      row: this.props.row,
      column: this.props.column,
      promote: promote,
    }
    this.props.store!.clickPiece(p)
  }
}

interface GetClassNameProps {
  r: number // row
  c: number // column
  rv: boolean // isReversed
  p: Piece
  sel?: Point // selected
  confirm?: Confirm
  isTurn: boolean
  isTargeted: boolean
}

// つらい感じ
function getClassName(p: GetClassNameProps): string {
  if (
    p.confirm &&
    p.sel &&
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
    p.sel !== undefined &&
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
