import PieceObj from '../game-handler/piece';
import EmpObj from '../game-handler/emp';
import PromotionConfirm from '../game-handler/promotion-confirm';
import { isEmp } from './type-checker';

type CellComponent = PieceObj | EmpObj | PromotionConfirm;
type Positions = Array<Array<CellComponent>>;
type PieceOrEmp = PieceObj | EmpObj;
type EmpTargets = Array<EmpObj>;
type PieceOrEmpTargets = Array<PieceOrEmp>;

export default function movEmpLocations(pos: Positions): EmpTargets {
  return rowRec(0, []);

  function rowRec(row: number, listCanMoveTo: PieceOrEmpTargets): EmpTargets {
    if (row === 9) {
      return listCanMoveTo.slice();
    } else {
      return rowRec(row + 1, colRec(0, listCanMoveTo));
    }

    function colRec(col: number, listCanMoveTo: PieceOrEmpTargets): EmpTargets {
      if (col === 9) {
        return listCanMoveTo.slice();
      } else {
        const target: CellComponent = pos[row][col];
        const list = addTargetIfEmp(target, listCanMoveTo);
        return colRec(col + 1, list);
      }
    }

    function addTargetIfEmp(
      target: CellComponent,
      listCanMoveTo: PieceOrEmpTargets,
    ): EmpTargets {
      if (isEmp(target)) {
        return listCanMoveTo.concat(target);
      } else {
        return listCanMoveTo.slice();
      }
    }
  }
}
