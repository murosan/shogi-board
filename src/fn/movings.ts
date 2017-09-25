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

export interface MovProps {
  pieceObj: PieceObj;
  positions: Positions;
}

export default function movings(props: MovProps): Array<PieceObj | EmpObj> {
  const name = props.pieceObj.name;
  if (name === '歩') {
    return movFu(props);
  } else if (name === '香') {
    return movKy(props);
  } else if (name === '桂') {
    return movKe(props);
  } else if (name === '銀') {
    return movGi(props);
  } else if (name === '金') {
    return movKi(props);
  } else if (name === '角') {
    return movKa(props);
  } else if (name === '飛') {
    return movHi(props);
  } else if (name === '玉') {
    return movGy(props);
  } else {
    /* name === '馬' || name === '龍' */
    const targets = name === '馬' ? movKa(props) : movHi(props);
    const movs = movGy(props).concat(targets);
    return Array.from(new Set(movs));
  }
}
