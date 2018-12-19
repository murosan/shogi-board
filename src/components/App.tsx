import React, { Component } from 'react'
import { move } from '../lib/handler/position'
import { ClickProps } from '../model/events/ClickFunc'
import Confirm from '../model/shogi/Confirm'
import GameState from '../model/shogi/GameState'
import { Piece } from '../model/shogi/Piece'
import Point from '../model/shogi/Point'
import { Turn } from '../model/shogi/Turn'
import './App.scss'
import BoardArea from './shogi/BoardArea'

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

    // 選択された駒をクリックしたら選択解除
    if (sel && isPiece(p.clicked) && selectedAgain(sel, p)) {
      this.state.gs.selected = undefined
      this.updateState(this.state.gs)
      return
    }

    // 手番側の駒なら選択する
    if (isPiece(p.clicked) && ownerIsTurn(p.clicked, turn)) {
      this.state.gs.selected = {
        row: p.row,
        column: p.column,
        piece: p.clicked,
        i: p.i || 0,
      }
      this.updateState(this.state.gs)
      return
    }

    // 選択された駒がないとき、手番ではない方の駒or空白マスがクリックされたらなにもしない
    if (!sel || !sel.piece) return

    // Confirm オブジェクトがクリックされたら動かす(成or不成の処理)
    // Confirm が出てる時はバリデーション済みなはず
    if (!isPiece(p.clicked)) {
      this.state.gs.pos = move({
        pos: this.state.gs.pos,
        source: { row: sel.row, column: sel.column },
        dest: { row: p.row, column: p.column },
        piece: p.promote ? p.clicked.promoted : p.clicked.preserved,
      })
      this.state.gs.selected = undefined
      this.updateState(this.state.gs)
      return
    }

    // TODO: バリデーション

    // TODO: 成・不成の選択ができるように、必要なら Confirm オブジェクトをセット

    this.state.gs.pos = move({
      pos: this.state.gs.pos,
      source: { row: sel.row, column: sel.column },
      dest: { row: p.row, column: p.column },
      piece: sel.piece,
    })
    this.state.gs.selected = undefined
    this.updateState(this.state.gs)
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
