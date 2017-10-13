import * as React from 'react';
import {
  EmpElm,
  PromotionConfirmElm,
  Promote,
  NotPromote,
} from '../../src/components/non-piece';
import PieceObj from '../../src/game-handler/piece';
import PromotionConfirmObj from '../../src/game-handler/promotion-confirm';

describe('Emp', async () => {
  test('作れる', () => {
    const emp = <EmpElm onClick={() => console.log('onclick')} />;
    expect(emp).toBeDefined();
  });
});

describe('PromotionConfirm', async () => {
  test('作れる', async () => {
    const piece1 = new PieceObj('と', 0, 2, 7);
    const piece2 = new PieceObj('歩', 0, 2, 7);
    const pc = new PromotionConfirmObj(piece2, piece2, piece1);
    const elm = (
      <PromotionConfirmElm pcObj={pc} onClick={t => console.log('onclick')} />
    );
    expect(elm).toBeDefined();
  });
});

describe('Promote', async () => {
  test('作れる', () => {
    const elm = <Promote onClick={() => console.log('onclick')} />;
    expect(elm).toBeDefined();
  });
});

describe('NotPromote', async () => {
  test('作れる', () => {
    const elm = <NotPromote onClick={() => console.log('onclick')} />;
    expect(elm).toBeDefined();
  });
});
