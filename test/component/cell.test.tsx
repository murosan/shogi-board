import * as React from 'react';
import { shallow } from 'enzyme';
import Cell from '../../src/components/cell';
import PieceElm from '../../src/components/piece';
import { EmpElm, PromotionConfirmElm } from '../../src/components/non-piece';
import PromotionConfirmObj from '../../src/game-handler/promotion-confirm';
import { CellComponent } from '../../src/game';
import init from '../../src/fn/init';

describe('Cell', async () => {
  const pos = init();
  const onClick = t => console.log('clicked');
  test('作成できる', async () => {
    const elm = shallow(
      <Cell
        row={7}
        col={7}
        positions={pos}
        isReversed={false}
        onClick={onClick}
      />,
    );
    expect(elm.hasClass('cell')).toBeTruthy();
  });

  test('クラス名(cell-bottom, cell-right, star)を追加できる', async () => {
    const elmBottom = shallow(
      <Cell
        row={0}
        col={3}
        positions={pos}
        isReversed={true}
        onClick={onClick}
      />,
    );
    const elmRight = shallow(
      <Cell
        row={3}
        col={0}
        positions={pos}
        isReversed={true}
        onClick={onClick}
      />,
    );
    const elmStar = shallow(
      <Cell
        row={2}
        col={2}
        positions={pos}
        isReversed={false}
        onClick={onClick}
      />,
    );
    expect(elmBottom.hasClass('cell-bottom')).toBeTruthy();
    expect(elmRight.hasClass('cell-right')).toBeTruthy();
    expect(elmStar.hasClass('star')).toBeTruthy();
  });
});
