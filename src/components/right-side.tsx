import * as React from 'react';
import CaptureStage from './capture-stage';
import Positions from '../game-handler/positions';
import { Kif, OneStep } from '../game-handler/kif';
import KifArea from './kif-area';
import { CellComponent } from '../game';

export interface RightSideProps {
  positions: Positions;
  indexes: Array<number>;
  onClick: (t: CellComponent) => void;
  kif: Kif;
  kifClick: (oneStep: OneStep) => void
}

export default class RightSide extends React.Component<RightSideProps, {}> {
  render() {
    const isReversed = (this.props.indexes[0] === -1) ? false : true;
    const caps = isReversed ? this.props.positions.cap1 : this.props.positions.cap0;
    return (
      <div id={'right-side-part'}>
        <CaptureStage
          positions={this.props.positions}
          caps={caps}
          isReversed={isReversed}
          onClick={this.props.onClick}
        />
        <KifArea
          kif={this.props.kif}
          kifClick={this.props.kifClick}
          positions={this.props.positions}
          inlineKif={this.props.kif.getAsInline()}
        />
      </div>
    );
  }
}
