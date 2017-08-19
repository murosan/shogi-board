import * as React from 'react';
import { pieceId } from '../fn/strings';
import Positions from '../game-handler/positions';
import PieceObj from '../game-handler/piece';

export interface PieceElmProps {
  piece: PieceObj;
  row: number;
  col: number;
  positions: Positions;
  isReversed: boolean;
  onClick: () => void;
  styles?: object;
}

export default class PieceElm extends React.Component<PieceElmProps, {}> {
  render() {
    const piece = this.props.piece;
    const selected = this.props.positions.selected;
    const clsName = (this.props.row === -1) ? 'cap-piece' : 'piece';
    const clsNameList = (selected && selected === piece) ? [clsName, 'selected'] : [clsName];
    const elmId = pieceId(piece.name, piece.whose, this.props.isReversed);
    return (
      <div
        id={elmId}
        className={clsNameList.join(' ')}
        style={this.props.styles}
        onClick={this.props.onClick}
      ></div>
    );
  }
}
