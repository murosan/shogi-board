import ValidationInfo from '../../model/shogi/ValidationInfo'
import { newValidationInfo } from './validation-info'

it('ValidationInfo を初期化できる', async () => {
  const vi: ValidationInfo = newValidationInfo()
  expect(vi.targets).toEqual([])
})
