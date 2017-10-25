import { isPiece, isEmp, isPromotionConfirm } from '../../src/fn/type-checker';
import PieceObj from '../../src/game-handler/piece';
import EmpObj from '../../src/game-handler/emp';
import PromotionConfirmObj from '../../src/game-handler/promotion-confirm';

describe('type-checker', async () => {
  const piece = new PieceObj('歩', 0, 6, 7);
  const emp = new EmpObj();

  const p1 = new PieceObj('と', 0, 2, 7);
  const p2 = new PieceObj('歩', 0, 2, 7);
  const promotionConfirm = new PromotionConfirmObj(p2, p2, p1);

  test('isPiece', () => {
    expect(isPiece(piece)).toBeTruthy();
    expect(isPiece(emp)).toBeFalsy();
    expect(isPiece(promotionConfirm)).toBeFalsy();
  });

  test('isEmp', () => {
    expect(isEmp(emp)).toBeTruthy();
    expect(isEmp(piece)).toBeFalsy();
    expect(isEmp(promotionConfirm)).toBeFalsy();
  });

  test('isPromotionConfirm', () => {
    expect(isPromotionConfirm(promotionConfirm)).toBeTruthy();
    expect(isPromotionConfirm(emp)).toBeFalsy();
    expect(isPromotionConfirm(piece)).toBeFalsy();
  });
});
