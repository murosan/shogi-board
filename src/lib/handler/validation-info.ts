import Point from '../../model/shogi/Point'
import ValidationInfo from '../../model/shogi/ValidationInfo'

export function newValidationInfo(): ValidationInfo {
  return {
    turn: gen(),
    next: gen(),
  }
}

function gen(): Point[][][] {
  return [
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
  ]
}
