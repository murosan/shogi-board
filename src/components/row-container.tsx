import * as React from 'react';
import { Corner, EdgeHor, EdgeVer } from './edge';
import Cell from './cell';
import Positions from '../game-handler/positions';
import { CellComponent } from '../game';

export interface RowContainerProps {
  row: number;
  positions: Positions;
  indexes: Array<number>;
  onClick: (t: CellComponent) => void;
}

export default class RowContainer extends React.Component<RowContainerProps, {}> {
  render() {
    const r = this.props.row;
    const rowIsEdge = r === -1 || r === 9;
    const rc = this.props.indexes.map((c: number) => {
      const colIsEdge = c === -1 || c === 9;
      if (rowIsEdge && colIsEdge) {
        return <Corner key={'co:' + r + c} />;
      } else if (rowIsEdge && !colIsEdge) {
        return <EdgeHor key={'eh:' + r + c} row={r} col={c} />;
      } else if (!rowIsEdge && colIsEdge) {
        return <EdgeVer key={'ev:' + r + c} row={r} col={c} />;
      } else {
        return (
          <Cell
            key={'ce:' + r + c}
            row={r} col={c}
            positions={this.props.positions}
            isReversed={this.props.indexes[0] === -1 ? false : true}
            onClick={this.props.onClick}
          />
        );
      }
    });

    return <div className='row-container'>{rc}</div>
  }
}
