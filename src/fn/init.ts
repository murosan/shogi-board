import { CellComponent } from '../game'
import Positions from '../game-handler/positions';
import PieceObj from '../game-handler/piece';
import EmpObj from '../game-handler/emp';
import Captures from '../game-handler/captures';

export default function initPositions(): Positions {
  return new Positions(hirate(), new Captures(0), new Captures(1), 0);
}

function hirate(): Array<Array<CellComponent>> {
  return [
    [
      new PieceObj('香', 1, 0, 0),
      new PieceObj('桂', 1, 0, 1),
      new PieceObj('銀', 1, 0, 2),
      new PieceObj('金', 1, 0, 3),
      new PieceObj('玉', 1, 0, 4),
      new PieceObj('金', 1, 0, 5),
      new PieceObj('銀', 1, 0, 6),
      new PieceObj('桂', 1, 0, 7),
      new PieceObj('香', 1, 0, 8)
    ],
    [
      new EmpObj(),
      new PieceObj('飛', 1, 1, 1),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new PieceObj('角', 1, 1, 7),
      new EmpObj()
    ],
    [
      new PieceObj('歩', 1, 2, 0),
      new PieceObj('歩', 1, 2, 1),
      new PieceObj('歩', 1, 2, 2),
      new PieceObj('歩', 1, 2, 3),
      new PieceObj('歩', 1, 2, 4),
      new PieceObj('歩', 1, 2, 5),
      new PieceObj('歩', 1, 2, 6),
      new PieceObj('歩', 1, 2, 7),
      new PieceObj('歩', 1, 2, 8)
    ],
    [
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj()
    ],
    [
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj()
    ],
    [
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj()
    ],
    [
      new PieceObj('歩', 0, 6, 0),
      new PieceObj('歩', 0, 6, 1),
      new PieceObj('歩', 0, 6, 2),
      new PieceObj('歩', 0, 6, 3),
      new PieceObj('歩', 0, 6, 4),
      new PieceObj('歩', 0, 6, 5),
      new PieceObj('歩', 0, 6, 6),
      new PieceObj('歩', 0, 6, 7),
      new PieceObj('歩', 0, 6, 8)
    ],
    [
      new EmpObj(),
      new PieceObj('角', 0, 7, 1),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new PieceObj('飛', 0, 7, 7),
      new EmpObj()
    ],
    [
      new PieceObj('香', 0, 8, 0),
      new PieceObj('桂', 0, 8, 1),
      new PieceObj('銀', 0, 8, 2),
      new PieceObj('金', 0, 8, 3),
      new PieceObj('玉', 0, 8, 4),
      new PieceObj('金', 0, 8, 5),
      new PieceObj('銀', 0, 8, 6),
      new PieceObj('桂', 0, 8, 7),
      new PieceObj('香', 0, 8, 8)
    ]
  ];
}
