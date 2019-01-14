import ConfigModel from '../model/config/Config'
import { config } from './Config'

it('設定ファイルを読み込める', async () => {
  const expected: ConfigModel = {
    paintTargets: true,
  }
  expect(config).toEqual(expected)
})
