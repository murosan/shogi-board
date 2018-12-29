import { action, observable } from 'mobx'
import { ClickProps } from '../model/events/ClickFunc'
import Confirm from '../model/shogi/Confirm'
import GameState from '../model/shogi/GameState'
import { Piece } from '../model/shogi/Piece'
import Point from '../model/shogi/Point'
import Position from '../model/shogi/Position'
import { hirate } from '../model/shogi/PositionInit'
import { Turn } from '../model/shogi/Turn'
import getTargets from '../lib/validatior/getTargets'
import filterTargets from '../lib/validatior/utils/filterTargets'
import { move } from '../lib/handler/position'
import { canPromote, mustPromote, promote } from '../lib/handler/piece'
import { exists } from '../lib/validatior/utils/algorithm'

export default class GameStateStore implements GameState {
  @observable pos: Position = hirate()
  @observable indexes: number[] = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  @observable selected: Point | undefined = undefined
  @observable confirm: Confirm | undefined = undefined
  @observable moveTargets: Point[] = []

  @action clickPiece(p: ClickProps) {
    const sel = this.selected
    const turn = this.pos.turn

    // Confirm 画面なのに、成・不成以外がクリックされたらなにもしない
    if (this.confirm && isPiece(p.clicked)) return

    // 選択された駒をクリックしたら選択解除
    if (sel && isPiece(p.clicked) && selectedAgain(sel, p)) {
      this.selected = undefined
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
      this.selected = point
      const targets = getTargets(this.pos, point)
      const filtered = filterTargets(this.pos, point, targets)
      this.moveTargets = filtered
      return
    }

    // 選択された駒がないとき、手番ではない方の駒or空白マスがクリックされたらなにもしない
    if (!sel || !sel.piece) return

    // 動けない場所がクリックされたらなにもしない
    const foundIndex: number = exists(this.moveTargets, p)
    if (foundIndex === -1) return

    const moveAndUpdateState = (piece: Piece) => {
      this.pos = move({
        pos: this.pos,
        source: { row: sel.row, column: sel.column },
        dest: { row: p.row, column: p.column },
        piece: piece,
      })
      this.selected = undefined
      this.confirm = undefined
      this.moveTargets = []
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
      this.confirm = {
        promoted: promote(sel.piece),
        preserved: sel.piece,
        row: p.row,
        column: p.column,
      }
      return
    }

    moveAndUpdateState(mp ? promote(sel.piece) : sel.piece)
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
