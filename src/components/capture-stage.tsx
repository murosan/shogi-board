import * as React from 'react';
import PieceElm from './piece';
import Positions from '../game-handler/positions';
import { CellComponent } from '../game';
import Captures from '../game-handler/captures';
const adjuster = require('../../public/stylesheets/style');

export interface CaptureStageProps {
  positions: Positions;
  caps: Captures;
  isReversed: boolean;
  onClick: (t: CellComponent) => void;
}

export default class CaptureStage extends React.Component<
  CaptureStageProps,
  {}
  > {
  renderCapPiece(whose: number, name: string, alphabeticalName: string) {
    const elms = [];
    const caps = this.props.caps.captures.get(name);
    const len = caps ? caps.length : 0;
    if (0 < len) {
      for (let count = 1; count <= len; count++) {
        if (caps) {
          const piece = caps[count - 1];
          const whoseForStyle = this.props.isReversed ? 1 - whose : whose;
          elms.push(
            <PieceElm
              key={`cap-${alphabeticalName}:${count}`}
              piece={piece}
              row={-1}
              col={-1}
              classStr={`cap-${alphabeticalName}-${whoseForStyle}-${len}-${count} cap-piece`}
              positions={this.props.positions}
              isReversed={this.props.isReversed}
              onClick={() => this.props.onClick(piece)}
            />
          );
        }
      }
    }

    return elms;
  }

  render() {
    const whose = this.props.caps.whose;
    const capStg = this.props.isReversed ? 1 - whose : whose;
    return (
      <div className={`capture-stage cap-stg-${capStg}`}>
        <div className={`cap-row cap-row-${whose}`}>
          <div className={'cap-sep-area'} id={`cap-hi-${whose}`}>
            {this.renderCapPiece(whose, '飛', 'hisha')}
          </div>
          <div className={'cap-sep-area'} id={`cap-ka-${whose}`}>
            {this.renderCapPiece(whose, '角', 'kaku')}
          </div>
          <div className={'cap-sep-area'} id={`cap-ky-${whose}`}>
            {this.renderCapPiece(whose, '香', 'kyou')}
          </div>
        </div>
        <div className={`cap-row cap-row-${whose}`}>
          <div className={'cap-sep-area'} id={`cap-ki-${whose}`}>
            {this.renderCapPiece(whose, '金', 'kin')}
          </div>
          <div className={'cap-sep-area'} id={`cap-gi-${whose}`}>
            {this.renderCapPiece(whose, '銀', 'gin')}
          </div>
          <div className={'cap-sep-area'} id={`cap-ke-${whose}`}>
            {this.renderCapPiece(whose, '桂', 'kei')}
          </div>
        </div>
        <div className={`cap-row cap-row-${whose}`}>
          <div className={'cap-sep-area'} id={`cap-fu-${whose}`}>
            {this.renderCapPiece(whose, '歩', 'fu')}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount(): void {
    adjuster.adjustCapPiece();
  }

  componentDidUpdate(): void {
    adjuster.adjustCapPiece();
  }
}
