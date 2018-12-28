import { hirate } from '../model/shogi/PositionInit'

export default function() {
  return {
    pos: hirate(),
    indexes: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    selected: undefined,
    confirm: undefined,
    moveTargets: [],
  }
}
