import ConfigModel from '../model/config/Config'
import { config } from './Config'

it('設定ファイルを読み込める', async () => {
  const expected: ConfigModel = {
    paintTargets: true,
    server: {
      protocol: 'http',
      host: 'localhost',
      port: 8080,
    },
  }
  expect(config).toEqual(expected)
})
