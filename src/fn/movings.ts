import Positions from '../game-handler/positions';
import PieceObj from '../game-handler/piece';
import EmpObj from '../game-handler/emp';

import movFu from './movings-fu';
import movKy from './movings-ky';
import movKe from './movings-ke';
import movGi from './movings-gi';
import movKi from './movings-ki';
import movKa from './movings-ka';
import movHi from './movings-hi';
import movGy from './movings-gy';

type Targets = Array<PieceObj | EmpObj>;

export interface MovProps {
  pieceObj: PieceObj;
  positions: Positions;
}

export default function movings(props: MovProps): Targets {
  const name = props.pieceObj.name;
  if (name === '歩') {
    return movFu(props);
  } else if (name === '香') {
    return movKy(props);
  } else if (name === '桂') {
    return movKe(props);
  } else if (name === '銀') {
    return movGi(props);
  } else if (['金', 'と', '成香', '成桂', '成銀'].includes(name)) {
    return movKi(props);
  } else if (name === '角') {
    return movKa(props);
  } else if (name === '飛') {
    return movHi(props);
  } else if (name === '玉') {
    return movGy(props);
  } else if (name === '馬') {
    return Array.from(new Set(movGy(props).concat(movKa(props))));
  } else if (name === '龍') {
    return Array.from(new Set(movGy(props).concat(movHi(props))));
  } else {
    throw new Error('pieceName is incorrect.');
  }
}
