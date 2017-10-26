import { CellComponent } from '../src/game';
import Positions from '../src/game-handler/positions';
import PieceObj from '../src/game-handler/piece';
import EmpObj from '../src/game-handler/emp';
import Captures from '../src/game-handler/captures';

/*
テスト用の配置(0: 先手の駒, 1: 後手の駒)
[・ ・ ・ ・ ・ ・ ・ ・ ・ ]
[・ 玉1・ ・ ・ ・ ・ ・ ・ ]
[・ 銀1・ 金1・ ・ 桂1・ ・ ]
[・ 歩1歩1・ ・ ・ 歩1歩1・ ]
[歩0・ ・ 歩1・ 歩1・ ・ ・ ]
[・ 歩0歩0歩0・ 歩0歩0歩0・ ]
[・ 銀0・ 銀0・ ・ 桂0・ ・ ]
[・ 玉0金0・ ・ ・ 角0・ 龍1]
[・ ・ ・ ・ 杏1・ ・ ・ ・ ]

持ち駒(数字は枚数)
  先手: 角1, 金1, 銀1, 桂1, 香1,
  後手: 飛1, 金1, 桂1, 香2, 歩5,
*/

export default function initPositions(turn: number = 0): Positions {
  const capMap0 = new Map([
    ['飛', []],
    ['角', [new PieceObj('角', 0, -1, -1)]],
    ['金', [new PieceObj('金', 0, -1, -1)]],
    ['銀', [new PieceObj('銀', 0, -1, -1)]],
    ['桂', [new PieceObj('桂', 0, -1, -1)]],
    ['香', [new PieceObj('香', 0, -1, -1)]],
    ['歩', []],
  ]);
  const capMap1 = new Map([
    ['飛', [new PieceObj('飛', 0, -1, -1)]],
    ['角', []],
    ['金', [new PieceObj('金', 0, -1, -1)]],
    ['銀', []],
    ['桂', [new PieceObj('桂', 0, -1, -1)]],
    ['香', [new PieceObj('香', 0, -1, -1), new PieceObj('香', 0, -1, -1)]],
    [
      '歩',
      [
        new PieceObj('歩', 0, -1, -1),
        new PieceObj('歩', 0, -1, -1),
        new PieceObj('歩', 0, -1, -1),
        new PieceObj('歩', 0, -1, -1),
        new PieceObj('歩', 0, -1, -1),
      ],
    ],
  ]);

  const pos = [
    [
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
    ],
    [
      new EmpObj(),
      new PieceObj('玉', 1, 1, 1),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
    ],
    [
      new EmpObj(),
      new PieceObj('銀', 1, 2, 1),
      new EmpObj(),
      new PieceObj('金', 1, 2, 3),
      new EmpObj(),
      new EmpObj(),
      new PieceObj('桂', 1, 2, 6),
      new EmpObj(),
      new EmpObj(),
    ],
    [
      new EmpObj(),
      new PieceObj('歩', 1, 3, 1),
      new PieceObj('歩', 1, 3, 2),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new PieceObj('歩', 1, 3, 6),
      new PieceObj('歩', 1, 3, 7),
      new EmpObj(),
    ],
    [
      new PieceObj('歩', 0, 4, 0),
      new EmpObj(),
      new EmpObj(),
      new PieceObj('歩', 1, 4, 3),
      new EmpObj(),
      new PieceObj('歩', 1, 4, 5),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
    ],
    [
      new EmpObj(),
      new PieceObj('歩', 0, 5, 1),
      new PieceObj('歩', 0, 5, 2),
      new PieceObj('歩', 0, 5, 3),
      new EmpObj(),
      new PieceObj('歩', 0, 5, 5),
      new PieceObj('歩', 0, 5, 6),
      new PieceObj('歩', 0, 5, 7),
      new EmpObj(),
    ],
    [
      new EmpObj(),
      new PieceObj('銀', 0, 6, 1),
      new EmpObj(),
      new PieceObj('銀', 0, 6, 3),
      new EmpObj(),
      new EmpObj(),
      new PieceObj('桂', 0, 6, 6),
      new EmpObj(),
      new EmpObj(),
    ],
    [
      new EmpObj(),
      new PieceObj('玉', 0, 7, 1),
      new PieceObj('金', 0, 7, 2),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new PieceObj('角', 0, 7, 6),
      new EmpObj(),
      new PieceObj('龍', 1, 7, 8),
    ],
    [
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new PieceObj('成香', 0, 8, 4),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
      new EmpObj(),
    ],
  ];

  return new Positions(
    pos,
    new Captures(0, capMap0),
    new Captures(1, capMap1),
    turn,
  );
}
