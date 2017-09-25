import * as React from 'react';
import CaptureStage from './capture-stage';
import Positions from '../game-handler/positions';
import Buttons from './buttons';
import { CellComponent } from '../game';

export interface LeftSideProps {
  positions: Positions;
  indexes: Array<number>;
  onClick: (t: CellComponent) => void;
  upsideDown: () => void;
  changeIndexByDiff: (diff: number) => void;
  changeIndexToEnd: (st: 'head' | 'last') => void;
  copyKif: () => void;
}

export default class LeftSide extends React.Component<LeftSideProps, {}> {
  render() {
    const isReversed = this.props.indexes[0] === -1 ? false : true;
    const caps = isReversed
      ? this.props.positions.cap0
      : this.props.positions.cap1;
    return (
      <div id={'left-side-part'}>
        <CaptureStage
          positions={this.props.positions}
          caps={caps}
          isReversed={isReversed}
          onClick={this.props.onClick}
        />
        <Buttons
          upsidedown={this.props.upsideDown}
          changeIndexByDiff={this.props.changeIndexByDiff}
          changeIndexToEnd={this.props.changeIndexToEnd}
          copyKif={this.props.copyKif}
        />
      </div>
    );
  }
}
