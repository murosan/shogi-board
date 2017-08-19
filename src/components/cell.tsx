import * as React from 'react';
import PieceElm from './piece';
import { EmpElm, PromotionConfirmElm } from './non-piece';
import Positions from '../game-handler/positions';
import EmpObj from '../game-handler/emp';
import PromotionConfirmObj from '../game-handler/promotion-confirm';
import { CellComponent } from '../game';

export interface CellProps {
  row: number;
  col: number;
  positions: Positions;
  isReversed: boolean;
  onClick: (t: CellComponent) => void;
}

export default class Cell extends React.Component<CellProps, {}> {
  renderChild(p: CellComponent) {
    if (p instanceof EmpObj) {
      return <EmpElm onClick={() => this.props.onClick(p)} />;
    } else if (p instanceof PromotionConfirmObj) {
      return <PromotionConfirmElm
        pcObj={p}
        onClick={(p: CellComponent) => this.props.onClick(p)}
      />;
    } else {
      return (
        <PieceElm
          piece={p}
          row={this.props.row}
          col={this.props.col}
          positions={this.props.positions}
          isReversed={this.props.isReversed}
          onClick={() => this.props.onClick(p)}
        />
      );
    }
  }

  render() {
    const classNameList = ['cell'];
    const r = this.props.row;
    const c = this.props.col;
    const rv = this.props.isReversed;
    const piece = this.props.positions.pos[r][c];
    if ((!rv && r === 8) || (rv && r === 0)) { classNameList.push('cell-bottom'); }
    if ((!rv && c === 8) || (rv && c === 0)) { classNameList.push('cell-right'); }

    return (
      <div className={classNameList.join(' ')}>
        {this.renderChild(piece)}
      </div>
    );
  }
}
