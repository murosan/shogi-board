import PieceObj from '../../src/game-handler/piece';
import movings from '../../src/fn/movings';
import initForTest from '../init-pos-for-test';

test('エラーが投げられる', async () => {
  const positions = initForTest(0);
  const wrongPiece = new PieceObj('竜', 0, 3, 7);
  expect(() => {
    movings({ pieceObj: wrongPiece, positions: positions });
  }).toThrow('pieceName is incorrect.');
});
