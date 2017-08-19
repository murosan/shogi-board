import * as React from 'react';
import RowContainer from './row-container';
import Positions from '../game-handler/positions';
import { CellComponent } from '../game';

export interface BoardProps {
  positions: Positions;
  indexes: Array<number>;
  onClick: (t: CellComponent) => void;
}

export default class Board extends React.Component<BoardProps, {}> {
  render() {
    const board = this.props.indexes.map((r) => {
      return (
        <RowContainer
          key={'rc:' + r}
          row={r}
          positions={this.props.positions}
          indexes={this.props.indexes}
          onClick={this.props.onClick}
        />
      );
    });

    return <div id='board'>{board}</div>;
  }
}
