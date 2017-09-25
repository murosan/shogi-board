import PieceObj from '../game-handler/piece';
import EmpObj from '../game-handler/emp';
import PromotionConfirm from '../game-handler/promotion-confirm';

export default function movEmpLocations(
  pos: Array<Array<PieceObj | EmpObj | PromotionConfirm>>
): Array<EmpObj> {
  function rowRec(row: number, movs: Array<PieceObj | EmpObj>): Array<EmpObj> {
    function colRec(col: number, movs: Array<PieceObj | EmpObj>): Array<EmpObj> {
      const movs_ = movs.slice();
      if (col === 9) {
        return movs_;
      } else {
        const target = pos[row][col];
        if (target instanceof EmpObj) {
          movs_.push(target);
        }
        return colRec(col + 1, movs_);
      }
    }

    const movs_ = movs.slice();
    if (row === 9) {
      return movs_;
    } else {
      return rowRec(row + 1, colRec(0, movs_));
    }
  }

  return rowRec(0, []);
}
