import React, { Component } from 'react'
import { move } from '../lib/handler/position'
import { ClickProps } from '../model/events/ClickFunc'
import Confirm from '../model/shogi/Confirm'
import GameState from '../model/shogi/GameState'
import { Piece, Kei0 } from '../model/shogi/Piece'
import Point from '../model/shogi/Point'
import { Turn } from '../model/shogi/Turn'
import './App.scss'
import BoardArea from './shogi/BoardArea'
import getTargets from '../lib/validatior/getTargets'
import { canPromote, promote, mustPromote } from '../lib/handler/piece'

export interface Props {
  gs: GameState
}

// TODO: global state などへの移行を検討する
export interface State {
  gs: GameState
}

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      gs: props.gs,
    }
  }

  render() {
    return (
      <div className="App App-BoardOnly">
        <BoardArea
          gs={this.state.gs}
          click={(p: ClickProps) => this.click(p)}
        />
      </div>
    )
  }

  click(p: ClickProps): void {
    const sel = this.state.gs.selected
    const turn: Turn = this.state.gs.pos.turn

    // Confirm 画面なのに、成・不成以外がクリックされたらなにもしない
    if (this.props.gs.confirm && isPiece(p.clicked)) return

    // 選択された駒をクリックしたら選択解除
    if (sel && isPiece(p.clicked) && selectedAgain(sel, p)) {
      this.state.gs.selected = undefined
      this.updateState(this.state.gs)
      return
    }

    // 手番側の駒なら選択する
    if (isPiece(p.clicked) && ownerIsTurn(p.clicked, turn)) {
      const point: Point = {
        row: p.row,
        column: p.column,
        piece: p.clicked,
        i: p.i || 0,
      }
      this.state.gs.selected = point
      this.state.gs.moveTargets = getTargets(this.state.gs.pos, point)
      this.updateState(this.state.gs)
      return
    }

    // 選択された駒がないとき、手番ではない方の駒or空白マスがクリックされたらなにもしない
    if (!sel || !sel.piece) return

    const canMove: boolean = !!this.state.gs.moveTargets.find(
      t => t.row === p.row && t.column === p.column
    )

    console.log(canMove)

    // 動けない場所がクリックされたらなにもしない
    if (!canMove) return

    const moveAndUpdateState = (piece: Piece) => {
      this.state.gs.pos = move({
        pos: this.state.gs.pos,
        source: { row: sel.row, column: sel.column },
        dest: { row: p.row, column: p.column },
        piece: piece,
      })
      this.state.gs.selected = undefined
      this.state.gs.confirm = undefined
      this.state.gs.moveTargets = []
      this.updateState(this.state.gs)
    }

    // Confirm オブジェクトがクリックされたら動かす(成or不成の処理)
    if (!isPiece(p.clicked)) {
      moveAndUpdateState(p.promote ? p.clicked.promoted : p.clicked.preserved)
      return
    }

    // 成を選択できるか
    const cp: boolean = canPromote({
      sourceRow: sel.row,
      destRow: p.row,
      piece: sel.piece,
    })

    // 強制的に成る必要があるか
    const mp: boolean = mustPromote(sel.piece, p.row)

    // 成・不成の選択ができるように、Confirm オブジェクトをセット
    if (cp && !mp) {
      this.state.gs.confirm = {
        promoted: promote(sel.piece),
        preserved: sel.piece,
        row: p.row,
        column: p.column,
      }
      this.updateState(this.state.gs)
      return
    }

    moveAndUpdateState(mp ? promote(sel.piece) : sel.piece)
  }

  updateState(gs: GameState): void {
    this.setState({ gs: gs })
  }
}

function isPiece(pc: Piece | Confirm): pc is Piece {
  return typeof pc === 'number'
}

function ownerIsTurn(p: Piece, t: Turn): boolean {
  return (p < 0 && t === -1) || (p > 0 && t === 1)
}

function selectedAgain(sel: Point, cp: ClickProps): boolean {
  return (
    sel.row === cp.row &&
    sel.column === cp.column &&
    sel.piece === cp.clicked &&
    sel.i === cp.i
  )
}
