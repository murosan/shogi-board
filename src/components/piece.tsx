import * as React from 'react';
import { pieceId } from '../fn/strings';
import Positions from '../game-handler/positions';
import PieceObj from '../game-handler/piece';

export interface PieceElmProps {
  piece: PieceObj;
  row: number;
  col: number;
  classStr: string;
  positions: Positions;
  isReversed: boolean;
  onClick: () => void;
}

export default class PieceElm extends React.Component<PieceElmProps, {}> {
  render() {
    const piece = this.props.piece;
    const turn = this.props.positions.turn;
    const selected = this.props.positions.selected;
    const clsNameList =
      selected && selected === piece
        ? [this.props.classStr, 'selected']
        : [this.props.classStr];
    if (turn === piece.whose) {
      clsNameList.push('piece-turn');
    }
    const elmId = pieceId(piece.name, piece.whose, this.props.isReversed);
    return (
      <div
        id={elmId}
        className={clsNameList.join(' ')}
        onClick={this.props.onClick}
      />
    );
  }
}
