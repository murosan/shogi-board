import { action, computed, observable } from 'mobx'
import { canPromote, mustPromote, promote } from '../../handler/game/piece'
import { move } from '../../handler/game/position'
import { changeIndex } from '../../handler/kifu/changeIndex'
import { genKifuString } from '../../handler/kifu/genKifuString'
import getCurrent from '../../handler/kifu/getCurrent'
import pushMove from '../../handler/kifu/pushMove'
import { getTargets } from '../../lib/validatior/getTargets'
import { find } from '../../lib/validatior/utils/algorithm'
import filterTargets from '../../lib/validatior/utils/filterTargets'
import { ClickProps } from '../../model/events/ClickProps'
import { MoveProps } from '../../model/events/MoveProps'
import Kifu, { newKifu } from '../../model/kifu/Kifu'
import { Move } from '../../model/kifu/Move'
import Confirm from '../../model/shogi/Confirm'
import { Piece } from '../../model/shogi/Piece'
import Point from '../../model/shogi/Point'
import { Position } from '../../model/shogi/Position'
import { Gote, Sente, Turn } from '../../model/shogi/Turn'
import { GameState } from '../GameState'

export class DefaultGameState implements GameState {
  @observable indexes: number[] = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  @observable selected: Point | null = null
  @observable confirm: Confirm | null = null
  @observable moveTargets: Point[] = []
  @observable kifu: Kifu = newKifu()

  @computed get currentMove(): Move {
    return getCurrent(this.kifu)
  }

  @action reverse(): void {
    this.indexes = this.indexes.slice().reverse()
  }

  @computed get isReversed(): boolean {
    return this.indexes[0] === 9
  }

  @action clickPiece(p: ClickProps): void {
    const sel: Point | null = this.selected
    const turn: Turn = this.currentMove.pos.turn

    // Confirm 画面なのに、成・不成以外がクリックされたらなにもしない
    if (!!this.confirm && isPiece(p.clicked)) return

    // 選択された駒をクリックしたら選択解除
    if (!!sel && isPiece(p.clicked) && selectedAgain(sel, p)) {
      this.selected = null
      this.moveTargets = []
      return
    }

    // 手番側の駒なら選択する
    if (isPiece(p.clicked) && ownerIsTurn(p.clicked, turn)) {
      const { row, column, clicked, i } = p
      const point: Point = { row, column, piece: clicked, i }
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
    if (!sel || !sel.piece) return

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
      const kifuStr: string = genKifuString(moveProps, this.currentMove.dest)
      const moveForKifu: Move = {
        index: this.currentMove.index + 1,
        str: kifuStr,
        pos,
        source,
        dest,
        piece,
        promote,
      }
      this.setKifu(pushMove(this.kifu, moveForKifu))
    }

    // Confirm オブジェクトがクリックされたら動かす(成 or 不成の処理)
    if (!isPiece(p.clicked)) {
      const piece: Piece = p.promote ? p.clicked.promoted : p.clicked.preserved
      moveAndUpdateState(piece, p.promote)
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

  @action clickKifu(moveCount: number, branchIndex?: number): void {
    this.setKifu(changeIndex(this.kifu, moveCount, branchIndex))
  }

  @action setKifu(kifu: Kifu): void {
    this.selected = null
    this.confirm = null
    this.moveTargets = []
    this.kifu = kifu
  }
}

function isPiece(pc: Piece | Confirm): pc is Piece {
  return typeof pc === 'number'
}

function ownerIsTurn(p: Piece, t: Turn): boolean {
  return (p < 0 && t === Gote) || (p > 0 && t === Sente)
}

function selectedAgain(sel: Point, cp: ClickProps): boolean {
  return (
    sel.row === cp.row &&
    sel.column === cp.column &&
    sel.piece === cp.clicked &&
    sel.i === cp.i
  )
}
