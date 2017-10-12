import PieceObj from '../../src/game-handler/piece';
import PromotionConfirmObj from '../../src/game-handler/promotion-confirm';

test('promotion-confirmインスタンスが作成、更新ができる', () => {
  const piece1 = new PieceObj('と', 0, 2, 7);
  const piece2 = new PieceObj('歩', 0, 2, 7);
  expect(
    new PromotionConfirmObj(piece2, piece2, piece1).update(),
  ).toBeInstanceOf(PromotionConfirmObj);
});
