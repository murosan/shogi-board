import Config from '../model/config/Config'

// 初期設定を読み込む
const defaultValues: Config = require('./default')

// 環境別の設定ファイルを読み込む
// test ならテスト用ファイルを読み込む
const env = process.env.NODE_ENV
const file: string = env === 'test' ? 'for-testing' : env
const userDefined: Config = require(`./${file}`)

// 合成
export const config: Config = Object.assign({}, defaultValues, userDefined)
