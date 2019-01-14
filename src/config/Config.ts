import Config from '../model/config/Config'

// TODO: もう少しちゃんとする
const env = process.env.NODE_ENV
export const config: Config = require(`../../config/${env}`)
