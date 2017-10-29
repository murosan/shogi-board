import PieceObj from '../game-handler/piece';
import EmpObj from '../game-handler/emp';
import PromotionConfirmObj from '../game-handler/promotion-confirm';
import { KifComponent } from '../game-handler/kif';
import Branch from '../game-handler/branch';

type CellComponent = PieceObj | EmpObj | PromotionConfirmObj;

export function isPiece(cc: CellComponent): cc is PieceObj {
  return cc instanceof PieceObj;
}

export function isPromotionConfirm(
  cc: CellComponent,
): cc is PromotionConfirmObj {
  return cc instanceof PromotionConfirmObj;
}

export function isEmp(cc: CellComponent): cc is EmpObj {
  return cc instanceof EmpObj;
}

export function isBranch(b: KifComponent): b is Branch {
  return b instanceof Branch;
}
