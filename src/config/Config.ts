import Config from '../model/config/Config'

// 初期設定を読み込む
const defaultValues: Config = require('../../config/default')

// 環境別の設定ファイルを読み込む
const env = process.env.NODE_ENV
const userDefined: Config = require(`../../config/${env}`)

// 合成
export const config: Config = Object.assign({}, defaultValues, userDefined)
