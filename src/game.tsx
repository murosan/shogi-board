import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Board from './components/board';
import LeftSide from './components/left-side';
import RightSide from './components/right-side';
import Positions from './game-handler/positions';
import PieceObj from './game-handler/piece';
import EmpObj from './game-handler/emp';
import PromotionConfirmObj from './game-handler/promotion-confirm';
import { Kif, OneStep } from './game-handler/kif';
import { isPiece, isEmp, isPromotionConfirm } from './fn/type-checker';
import movings from './fn/movings';
import init from './fn/init';
const styleAdjuster = require('../public/stylesheets/style');

export type CellComponent = PieceObj | EmpObj | PromotionConfirmObj;
type SelectedPossibility = PieceObj | PromotionConfirmObj | undefined;
type TupOfPosKif = [Positions, string | undefined];

interface GameState {
  positions: Positions;
  indexes: Array<number>;
  kif: Kif;
}

export default class Game extends React.Component<{ init: Positions }, GameState> {
  constructor(props: { init: Positions }) {
    super();
    this.state = {
      positions: props.init,
      indexes: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      kif: new Kif([{ positions: props.init, str: '開始局面' }])
    };
  }

  handleClick(target: CellComponent): void {
    const selected: SelectedPossibility = this.state.positions.selected;
    const positions: Positions = this.state.positions;
    const turn: number = positions.turn;

    if (!selected) {
      select(this, target);
    } else if (isPromotionConfirm(selected) && isPiece(target)) {
      move(this, selected, target);
    } else if (isPiece(selected)) {
      moveOrChangeSelected(this, selected, target);
    }

    function select(this_: Game, target: CellComponent) {
      if (isPieceAndMine(target)) {
        setSelectedToPos(this_, target);
      }
    }

    function moveOrChangeSelected(
      this_: Game,
      selected: PieceObj,
      target: CellComponent
    ) {
      if (isEmpOrEnemyPiece(target)) {
        moveIfCanMove(this_, selected, target);
      } else if (isPiece(target)) {
        toggleOrChangeSelected(this_, selected, target);
      }
    }

    function moveIfCanMove(this_: Game, selected: PieceObj, target: PieceObj | EmpObj) {
      if (selected.canMove(target)) {
        move(this_, target, selected);
      }
    }

    function toggleOrChangeSelected(this_: Game, selected: PieceObj, target: PieceObj) {
      if (target === selected) {
        const noSelectedPos = positions.update();
        setPos(this_, noSelectedPos);
      } else {
        setSelectedToPos(this_, target);
      }
    }

    function setSelectedToPos(this_: Game, target: PieceObj) {
      const selected = positions.select(target);
      setCanMoveTo(target);
      setPos(this_, selected);
    }

    function isEmpOrEnemyPiece(cc: CellComponent): cc is EmpObj | PieceObj {
      return isEmp(cc) || (isPiece(cc) && cc.whose !== turn);
    }

    function isPieceAndMine(cc: CellComponent): cc is PieceObj {
      return isPiece(target) && target.whose === turn;
    }

    function setCanMoveTo(target: PieceObj) {
      target.canMoveTo = movings({ pieceObj: target, positions: positions });
    }

    function move(this_: Game, target: CellComponent, source: PieceObj) {
      const moved: TupOfPosKif = positions.move(target, source);
      const pos: Positions = moved[0];
      const kifStr: string = moved[1] || '';
      const kif = pos.selected
        ? undefined
        : this_.state.kif.add(
            { positions: pos, str: kifStr },
            this_.state.kif.getCurrent()
          );
      setPos(this_, pos, kif);
    }

    function setPos(this_: Game, pos: Positions, kif?: Kif) {
      this_.setState({ positions: pos, kif: kif ? kif : this_.state.kif });
    }
  }

  changeKifIndexByDiff(diff: number): void {
    const inline: Array<OneStep> = this.state.kif.getAsInline();
    const diffApplied: number = inline.indexOf(this.state.kif.getCurrent()) + diff;
    if (diffApplied < 0) {
      this.changeKifIndexByTarget(inline[0]);
    } else if (inline.length <= diffApplied) {
      this.changeKifIndexByTarget(inline[inline.length - 1]);
    } else {
      this.changeKifIndexByTarget(inline[diffApplied]);
    }
  }

  changeKifIndexToEnd(st: 'head' | 'last') {
    const inlineKif: Array<OneStep> = this.state.kif.getAsInline();
    const index = st === 'head' ? 0 : inlineKif.length - 1;
    this.changeKifIndexByTarget(inlineKif[index]);
  }

  changeKifIndexByTarget(target: OneStep): void {
    const kif: Kif = this.state.kif.changeIndex(target);
    this.setState({
      positions: kif.getCurrent().positions,
      kif: kif
    });
  }

  upsideDown(): void {
    this.setState({
      indexes: this.state.indexes.reverse()
    });
  }

  copyKif(): void {
    function extractKifString(oneStep: OneStep, index: number) {
      return index + ' ' + oneStep.str;
    }

    function removeHead(kifStr: string, index: number) {
      if (index !== 0) {
        return kifStr;
      }
    }

    const inlineKif: Array<OneStep> = this.state.kif.getAsInline();
    const kifStr: Array<string> = inlineKif.map(extractKifString).filter(removeHead);
    const tarea = document.createElement('textarea');
    tarea.value = kifStr.join('\n');
    tarea.style.width = '1px';
    tarea.style.height = '1px';
    document.body.appendChild(tarea);
    tarea.select();
    document.execCommand('copy');
    document.body.removeChild(tarea);
  }

  render(): JSX.Element {
    const positions: Positions = this.state.positions;
    const indexes: Array<number> = this.state.indexes;
    const clickHandlers = {
      handleClick: (t: CellComponent) => this.handleClick(t),
      changeIndexByDiff: (diff: number) => this.changeKifIndexByDiff(diff),
      changeIndexToEnd: (st: 'head' | 'last') => this.changeKifIndexToEnd(st),
      changeKifIndexByTarget: (om: OneStep) => this.changeKifIndexByTarget(om),
      upsideDown: () => this.upsideDown(),
      copyKif: () => this.copyKif()
    };
    return (
      <div id="play-area">
        <LeftSide
          positions={positions}
          indexes={indexes}
          onClick={clickHandlers.handleClick}
          upsideDown={clickHandlers.upsideDown}
          changeIndexByDiff={clickHandlers.changeIndexByDiff}
          changeIndexToEnd={clickHandlers.changeIndexToEnd}
          copyKif={clickHandlers.copyKif}
        />
        <Board
          positions={positions}
          indexes={indexes}
          onClick={clickHandlers.handleClick}
        />
        <RightSide
          positions={positions}
          indexes={indexes}
          onClick={clickHandlers.handleClick}
          kif={this.state.kif}
          kifClick={clickHandlers.changeKifIndexByTarget}
        />
      </div>
    );
  }

  componentDidMount() {
    styleAdjuster.adjust();
  }
}

// ============================================

ReactDOM.render(<Game init={init()} />, document.getElementById('app'));
