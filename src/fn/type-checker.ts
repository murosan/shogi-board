import PieceObj from '../game-handler/piece';
import EmpObj from '../game-handler/emp';
import PromotionConfirmObj from '../game-handler/promotion-confirm';

type CellComponent = PieceObj | EmpObj | PromotionConfirmObj;

export function isPiece(cc: CellComponent): cc is PieceObj {
  return cc instanceof PieceObj;
}

export function isPromotionConfirm(cc: CellComponent): cc is PromotionConfirmObj {
  return cc instanceof PromotionConfirmObj;
}

export function isEmp(cc: CellComponent): cc is EmpObj {
  return cc instanceof EmpObj;
}
