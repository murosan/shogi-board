import PieceObj from './piece';

export default class PromotionConfirm {
  origin: PieceObj;
  moved: PieceObj;
  promoted: PieceObj;
  constructor(origin: PieceObj, moved: PieceObj, promoted: PieceObj) {
    this.origin = origin;
    this.moved = moved;
    this.promoted = promoted;
  }

  update() {
    return new PromotionConfirm(this.origin, this.moved, this.promoted);
  }
}
