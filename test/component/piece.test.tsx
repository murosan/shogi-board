import * as React from 'react';
import { shallow } from 'enzyme';
import PieceElm, { PieceElmProps } from '../../src/components/piece';
import PieceObj from '../../src/game-handler/piece';
import Positions from '../../src/game-handler/positions';
import init from '../../src/fn/init';

describe('PieceElm', async () => {
  test('作成できる', async () => {
    const props: PieceElmProps = {
      piece: new PieceObj('歩', 0, 6, 7),
      row: 6,
      col: 7,
      classStr: 'piece',
      positions: init(),
      isReversed: false,
      onClick: () => console.log('clicked'),
    };
    const elm = shallow(
      <PieceElm
        piece={props.piece}
        row={props.row}
        col={props.col}
        classStr={props.classStr}
        positions={props.positions}
        isReversed={props.isReversed}
        onClick={props.onClick}
      />,
    );
    expect(elm).toBeDefined();
  });
});
