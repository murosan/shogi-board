import { observer } from 'mobx-react-lite'
import React, { CSSProperties, FC } from 'react'
import Column1Img from '../../img/components/columns/1.svg'
import Column2Img from '../../img/components/columns/2.svg'
import Column3Img from '../../img/components/columns/3.svg'
import Column4Img from '../../img/components/columns/4.svg'
import Column5Img from '../../img/components/columns/5.svg'
import Column6Img from '../../img/components/columns/6.svg'
import Column7Img from '../../img/components/columns/7.svg'
import Column8Img from '../../img/components/columns/8.svg'
import Column9Img from '../../img/components/columns/9.svg'
import Row1Img from '../../img/components/rows/1.svg'
import Row2Img from '../../img/components/rows/2.svg'
import Row3Img from '../../img/components/rows/3.svg'
import Row4Img from '../../img/components/rows/4.svg'
import Row5Img from '../../img/components/rows/5.svg'
import Row6Img from '../../img/components/rows/6.svg'
import Row7Img from '../../img/components/rows/7.svg'
import Row8Img from '../../img/components/rows/8.svg'
import Row9Img from '../../img/components/rows/9.svg'
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

  const bgImg = (url: string) => ({ backgroundImage: `url(${url})` })
  let style: CSSProperties | undefined
  if (inRange(column) && row === -1) {
    if (column === 0) style = bgImg(Column1Img)
    else if (column === 1) style = bgImg(Column2Img)
    else if (column === 2) style = bgImg(Column3Img)
    else if (column === 3) style = bgImg(Column4Img)
    else if (column === 4) style = bgImg(Column5Img)
    else if (column === 5) style = bgImg(Column6Img)
    else if (column === 6) style = bgImg(Column7Img)
    else if (column === 7) style = bgImg(Column8Img)
    else style = bgImg(Column9Img)
  } else if (inRange(row) && column === -1) {
    if (row === 0) style = bgImg(Row1Img)
    else if (row === 1) style = bgImg(Row2Img)
    else if (row === 2) style = bgImg(Row3Img)
    else if (row === 3) style = bgImg(Row4Img)
    else if (row === 4) style = bgImg(Row5Img)
    else if (row === 5) style = bgImg(Row6Img)
    else if (row === 6) style = bgImg(Row7Img)
    else if (row === 7) style = bgImg(Row8Img)
    else style = bgImg(Row9Img)
  }

  return (
    <div className={className} onClick={() => click()} style={style}>
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
  const { r, c, sel, confirm, rv, isTurn, isTargeted } = p
  if (
    !!confirm &&
    !!sel &&
    ((r === sel.row && c === sel.column) ||
      (r === confirm.row && c === confirm.column))
  ) {
    // 成・不成の選択ウィンドウができるとき、元の駒の表示は消す
    // TODO: ひどい
    p.p = Empty
  }

  const classes: string[] = ['Cell']

  const rowInRange: boolean = inRange(r)
  const colInRange: boolean = inRange(c)
  const isLeft: boolean = rowInRange && ((!rv && c === 8) || (rv && c === 0))
  const isTop: boolean = colInRange && ((!rv && r === 0) || (rv && r === 8))
  const isStar: boolean =
    (!rv &&
      ((r === 2 && c === 6) ||
        (r === 2 && c === 3) ||
        (r === 5 && c === 6) ||
        (r === 5 && c === 3))) ||
    (rv &&
      ((r === 6 && c === 2) ||
        (r === 6 && c === 5) ||
        (r === 3 && c === 2) ||
        (r === 3 && c === 5)))
  const isSelected: boolean =
    rowInRange && colInRange && !!sel && sel.row === r && sel.column === c

  if (rowInRange && colInRange) {
    classes.push('Piece')
    classes.push('Piece-Bordered')
  }

  const rvp: number | undefined = p.p && rv ? p.p * -1 : p.p
  if (rvp) classes.push(`Piece-${rvp}`)
  if (isTurn) classes.push('Piece-Turn')
  if (isSelected) classes.push('Piece-Selected')
  if (isTargeted) classes.push('Piece-Targeted')
  if (isLeft) classes.push('Piece-Left')
  if (isTop) classes.push('Piece-Top')

  const isEdge = (c === -1 && rowInRange) || (r === -1 && colInRange)
  if (isEdge) classes.push('Cell-Edge')
  if (isStar) classes.push('Piece-Star')

  return classes.join(' ')
}

function inRange(n: number): boolean {
  return 0 <= n && n <= 8
}

export default observer(Cell)
