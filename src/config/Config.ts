import Cookies, { CookieAttributes } from 'js-cookie'
import { action, observable } from 'mobx'
import { Config } from '../model/config/Config'

export class DefaultConfig implements Config {
  @observable paintTargets: boolean
  @observable serverURL: string
  @observable saveToCookie: boolean

  private readonly keys = {
    paintTargets: 'paintTargets',
    serverURL: 'serverURL',
    saveToCookie: 'saveToCookie',
  }

  // 1年
  private readonly expire: CookieAttributes = { expires: 86400 * 365 }

  constructor() {
    this.paintTargets = !(Cookies.get(this.keys.paintTargets) === 'false')
    this.serverURL = Cookies.get(this.keys.serverURL) || ''
    this.saveToCookie = Cookies.get(this.keys.saveToCookie) === 'true'
  }

  @action
  async setPaintTargets(b: boolean): Promise<void> {
    this.paintTargets = b
    if (this.saveToCookie)
      Cookies.set(this.keys.paintTargets, String(b), this.expire)
  }

  @action
  async setServerURL(s: string): Promise<void> {
    this.serverURL = s
    if (this.saveToCookie) Cookies.set(this.keys.serverURL, s, this.expire)
  }

  @action
  async setSaveToCookie(b: boolean): Promise<void> {
    this.saveToCookie = b

    if (this.saveToCookie) {
      const { saveToCookie, serverURL, paintTargets } = this.keys
      const expire = this.expire
      Cookies.set(saveToCookie, String(b), expire)
      Cookies.set(serverURL, this.serverURL, expire)
      Cookies.set(paintTargets, String(this.paintTargets), expire)
      return
    }

    // false なら削除する
    Object.values(this.keys).forEach(key => Cookies.remove(key))
  }
}
