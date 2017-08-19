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
import movings from './fn/movings';
import init from './fn/init';

export type CellComponent = PieceObj | EmpObj | PromotionConfirmObj;

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
      kif: new Kif([{ positions: props.init, str: '開始局面' }]),
    };
  }

  handleClick(target: CellComponent): void {
    const selected: PieceObj | PromotionConfirmObj | undefined = this.state.positions.selected;
    const positions = this.state.positions;
    const turn = positions.turn;

    const setPos = ((pos: Positions, kif?: Kif) => {
      this.setState({
        positions: pos,
        kif: kif ? kif : this.state.kif,
      });
    });

    const move = ((target: CellComponent, source: PieceObj) => {
      const moved: [Positions, string | undefined] = positions.move(target, source);
      const pos: Positions = moved[0];
      const kifStr: string = moved[1] || '';
      const kif = pos.selected ? undefined :
        this.state.kif.add({ positions: pos, str: kifStr }, this.state.kif.getCurrent());
      setPos(pos, kif);
    });

    const notSelected = (() => {
      if ((target instanceof PieceObj) && (target.whose === turn)) {
        // targetが駒かつ、手番側の駒
        target.canMoveTo = movings({ pieceObj: target, positions: positions });
        setPos(positions.select(target));
      }
    });

    const selectedIsPiece = ((selected: PieceObj) => {
      if ((target instanceof EmpObj) || ((target instanceof PieceObj) && (target.whose !== turn))) {
        // targetが空ます、または、手番ではない側の駒
        if (selected.canMove(target)) { move(target, selected); }
      } else if (target instanceof PieceObj) {
        // targetが手番側の駒
        targetIsMine(target);
      }
    });

    const targetIsMine = ((target: PieceObj) => {
      if (target === selected) {
        // 同じ駒をクリックしたら選択状態を解除
        setPos(positions.update());
      } else {
        // 違う駒をクリックしたら選択状態にする
        target.canMoveTo = movings({ pieceObj: target, positions: positions });
        setPos(positions.select(target));
      }
    });

    if (!selected) {
      // 選択されたものがないとき
      notSelected();
    } else if ((selected instanceof PromotionConfirmObj) && (target instanceof PieceObj)) {
      // 成/不成の選択がされたとき(selected: PromotionConfirm, target: PieceObj)
      move(selected, target);
    } else if (selected instanceof PieceObj) {
      // 選択されたものが駒のとき
      selectedIsPiece(selected);
    }
  }

  changeKifIndexByTarget(target: OneStep): void {
    const kif: Kif = this.state.kif.changeIndex(target);
    this.setState({
      positions: kif.getCurrent().positions,
      kif: kif,
    });
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
    const inline: Array<OneStep> = this.state.kif.getAsInline();
    if (st === 'head') {
      this.changeKifIndexByTarget(inline[0]);
    } else {
      this.changeKifIndexByTarget(inline[inline.length - 1]);
    }
  }

  upsideDown(): void {
    this.setState({
      indexes: this.state.indexes.reverse()
    });
  }

  copyKif(): void {
    const inline: Array<OneStep> = this.state.kif.getAsInline();
    const kifStr: Array<string> = [];
    inline.forEach((e, i) => {
      if (i !== 0) { kifStr.push(i + ' ' + e.str); }
    });
    const tarea = document.createElement('textarea');
    tarea.value = kifStr.join('\n');
    document.body.appendChild(tarea);
    tarea.select();
    document.execCommand('copy');
    document.body.removeChild(tarea);
  }

  render() {
    const positions = this.state.positions;
    const indexes = this.state.indexes;
    return (
      <div id='play-area'>
        <LeftSide
          positions={positions}
          indexes={indexes}
          onClick={(t: CellComponent) => this.handleClick(t)}
          upsideDown={() => this.upsideDown()}
          changeIndexByDiff={(diff: number) => this.changeKifIndexByDiff(diff)}
          changeIndexToEnd={(st: 'head' | 'last') => this.changeKifIndexToEnd(st)}
          copyKif={() => this.copyKif()}
        />
        <Board
          positions={positions}
          indexes={indexes}
          onClick={(t: CellComponent) => this.handleClick(t)}
        />
        <RightSide
          positions={positions}
          indexes={indexes}
          onClick={(t: CellComponent) => this.handleClick(t)}
          kif={this.state.kif}
          kifClick={(om: OneStep) => this.changeKifIndexByTarget(om)}
        />
      </div>
    );
  }
}

// ============================================

ReactDOM.render(
  <Game init={init()} />,
  document.getElementById('app')
);

