import debounce from 'lodash.debounce'
import { action, observable } from 'mobx'
import { Config } from '../Config'

export class DefaultConfig implements Config {
  @observable paintTargets: boolean
  @observable serverURL: string
  @observable saveToLocalStorage: boolean
  @observable saveBoardWidth: boolean
  @observable appWidth: number | null

  private readonly keys = {
    paintTargets: 'paintTargets',
    serverURL: 'serverURL',
    saveToLocalStorage: 'saveToLocalStorage',
    saveBoardWidth: 'saveBoardWidth',
    appWidth: 'appWidth',
  }

  constructor() {
    const {
      paintTargets,
      serverURL,
      saveToLocalStorage,
      saveBoardWidth,
      appWidth,
    } = this.keys
    this.paintTargets = !(this.get(paintTargets) === 'false')
    this.serverURL = this.get(serverURL) || ''
    this.saveToLocalStorage = this.get(saveToLocalStorage) === 'true'
    this.saveBoardWidth = this.get(saveBoardWidth) === 'true'
    this.appWidth = (() => {
      if (!this.saveBoardWidth) return null

      const v = Number(this.get(appWidth))
      if (!v || isNaN(v)) return null
      return v
    })()
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

  @action
  async setSaveBoardWidth(b: boolean): Promise<void> {
    this.saveBoardWidth = b
    if (!b) {
      this.remove(this.keys.saveBoardWidth)
      this.remove(this.keys.appWidth)
      return
    }
    this.set(this.keys.saveBoardWidth, 'true')
    const w = this.appWidth
    if (w) this.saveAppWidth(w)
  }

  @action
  async setAppWidth(w?: number): Promise<void> {
    if (!w) {
      this.appWidth = null
      this.remove(this.keys.appWidth)
      return
    }
    this.appWidth = w
    this.saveAppWidth(w)
  }

  saveAppWidth = debounce(
    (w: number) => this.set(this.keys.appWidth, `${w}`),
    1000
  )

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
