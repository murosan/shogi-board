import { action, computed, observable } from 'mobx'
import { canPromote, mustPromote, promote } from '../lib/game-handler/piece'
import { move } from '../lib/game-handler/position'
import { changeIndex } from '../lib/kif-handler/changeIndex'
import { genKifString } from '../lib/kif-handler/genKifString'
import getCurrent from '../lib/kif-handler/getCurrent'
import pushMove from '../lib/kif-handler/pushMove'
import getTargets from '../lib/validatior/getTargets'
import { find } from '../lib/validatior/utils/algorithm'
import filterTargets from '../lib/validatior/utils/filterTargets'
import { ClickProps } from '../model/events/ClickProps'
import MoveProps from '../model/events/MoveProps'
import Kif, { newKif } from '../model/kif/Kif'
import Move from '../model/kif/Move'
import Confirm from '../model/shogi/Confirm'
import GameState from '../model/shogi/GameState'
import { Piece } from '../model/shogi/Piece'
import Point from '../model/shogi/Point'
import Position from '../model/shogi/Position'
import { hirate } from '../model/shogi/PositionInit'
import { Turn } from '../model/shogi/Turn'

export interface Store extends GameState {
  // 棋譜の現在表示局面を返す
  currentMove: Move

  // 盤面反転
  reverse(): void

  // 駒をクリックして動かしたりする
  clickPiece(p: ClickProps): void

  // 棋譜をクリックして表示局面を変える
  clickKif(moveCount: number, branchIndex?: number): void
}

export default class GameStateStore implements Store {
  @observable indexes: number[] = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  @observable selected: Point | undefined = undefined
  @observable confirm: Confirm | undefined = undefined
  @observable moveTargets: Point[] = []
  @observable kif: Kif = newKif()

  @computed get currentMove(): Move {
    return getCurrent(this.kif)
  }

  @action reverse(): void {
    this.indexes = this.indexes.slice().reverse()
  }

  @action clickPiece(p: ClickProps): void {
    const sel = this.selected
    const turn = this.currentMove.pos.turn

    // Confirm 画面なのに、成・不成以外がクリックされたらなにもしない
    if (this.confirm !== undefined && isPiece(p.clicked)) return

    // 選択された駒をクリックしたら選択解除
    if (sel !== undefined && isPiece(p.clicked) && selectedAgain(sel, p)) {
      this.selected = undefined
      return
    }

    // 手番側の駒なら選択する
    if (isPiece(p.clicked) && ownerIsTurn(p.clicked, turn)) {
      const point: Point = {
        row: p.row,
        column: p.column,
        piece: p.clicked,
        i: p.i,
      }
      this.selected = point
      const targets = getTargets(this.currentMove.pos, point)
      const filtered = filterTargets(this.currentMove.pos, point, targets)
      this.moveTargets = filtered
      return
    }

    // 選択された駒がない場合は、手番ではない方の駒or空白マスがクリックされた
    // ということなので何もしない
    // `|| sel.piece === undefined` の部分は
    // この後のコードで TypeScript のチェックを楽にするため
    if (sel === undefined || sel.piece === undefined) return

    // 動けない場所がクリックされたらなにもしない
    const foundIndex: number = find(this.moveTargets, p)
    if (foundIndex === -1) return

    const source: Point = { row: sel.row, column: sel.column }
    const dest: Point = { row: p.row, column: p.column }

    const moveAndUpdateState = (piece: Piece, promote?: boolean) => {
      const moveProps: MoveProps = {
        pos: this.currentMove.pos,
        source,
        dest,
        piece,
        promote,
      }
      const pos: Position = move(moveProps)
      const kifStr: string = genKifString(moveProps)
      const moveForKif: Move = {
        index: this.currentMove.index + 1,
        str: kifStr,
        pos,
        source,
        dest,
        piece,
        promote,
      }
      this.selected = undefined
      this.confirm = undefined
      this.moveTargets = []
      this.kif = pushMove(this.kif, moveForKif)
    }

    // Confirm オブジェクトがクリックされたら動かす(成 or 不成の処理)
    if (!isPiece(p.clicked)) {
      const piece: Piece = p.promote ? p.clicked.promoted : p.clicked.preserved
      moveAndUpdateState(piece, p.promote === true)
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

    const piece: Piece = mp ? promote(sel.piece) : sel.piece
    moveAndUpdateState(piece, mp || undefined)
  }

  @action clickKif(moveCount: number, branchIndex?: number): void {
    if (this.confirm) return
    this.kif = changeIndex(this.kif, moveCount, branchIndex)
    this.selected = undefined
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
