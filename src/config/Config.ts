import { action, observable } from 'mobx'
import { Config } from '../model/config/Config'

export class DefaultConfig implements Config {
  @observable paintTargets: boolean
  @observable serverURL: string
  @observable saveToLocalStorage: boolean

  private readonly keys = {
    paintTargets: 'paintTargets',
    serverURL: 'serverURL',
    saveToLocalStorage: 'saveToLocalStorage',
  }

  constructor() {
    this.paintTargets = !(this.get(this.keys.paintTargets) === 'false')
    this.serverURL = this.get(this.keys.serverURL) || ''
    this.saveToLocalStorage = this.get(this.keys.saveToLocalStorage) === 'true'
  }

  @action
  async setPaintTargets(b: boolean): Promise<void> {
    this.paintTargets = b
    if (this.saveToLocalStorage) this.set(this.keys.paintTargets, String(b))
  }

  @action
  async setServerURL(s: string): Promise<void> {
    this.serverURL = s
    if (this.saveToLocalStorage) this.set(this.keys.serverURL, s)
  }

  @action
  async setSaveToLocalStorage(b: boolean): Promise<void> {
    this.saveToLocalStorage = b

    if (this.saveToLocalStorage) {
      const { saveToLocalStorage, serverURL, paintTargets } = this.keys
      this.set(saveToLocalStorage, String(b))
      this.set(serverURL, this.serverURL)
      this.set(paintTargets, String(this.paintTargets))
      return
    }

    // false なら削除する
    Object.values(this.keys).forEach(key => this.remove(key))
  }

  private set(key: string, value: string): void {
    localStorage.setItem(key, value)
  }
  private get(key: string): string | null {
    return localStorage.getItem(key)
  }
  private remove(key: string): void {
    localStorage.removeItem(key)
  }
}
