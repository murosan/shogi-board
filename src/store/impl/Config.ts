import debounce from 'lodash.debounce'
import { action, makeObservable, observable } from 'mobx'
import { Config } from '../Config'

export class DefaultConfig implements Config {
  paintTargets: boolean
  serverURL: string
  saveToLocalStorage: boolean
  saveBoardWidth: boolean
  appWidth: number | null
  storeKifu: boolean

  private readonly keys = {
    paintTargets: 'paintTargets',
    serverURL: 'serverURL',
    saveToLocalStorage: 'saveToLocalStorage',
    saveBoardWidth: 'saveBoardWidth',
    appWidth: 'appWidth',
    storeKifu: 'storeKifu',
  }

  constructor() {
    makeObservable(this, {
      paintTargets: observable,
      serverURL: observable,
      saveToLocalStorage: observable,
      saveBoardWidth: observable,
      appWidth: observable,
      storeKifu: observable,

      setPaintTargets: action,
      setServerURL: action,
      setSaveToLocalStorage: action,
      setSaveBoardWidth: action,
      setAppWidth: action,
      setStoreKifu: action,
    })
    const {
      paintTargets,
      serverURL,
      saveToLocalStorage,
      saveBoardWidth,
      appWidth,
      storeKifu,
    } = this.keys
    this.paintTargets = !(this.get(paintTargets) === 'false')
    this.serverURL = this.get(serverURL) || ''
    this.saveToLocalStorage = this.get(saveToLocalStorage) === 'true'
    this.saveBoardWidth = this.get(saveBoardWidth) === 'true'
    this.appWidth = (() => {
      if (!this.saveBoardWidth) return null

      const v = this.get(appWidth)
      if (!v) return null

      const n = Number(v)
      if (isNaN(n)) return null
      return n
    })()
    this.storeKifu = this.get(storeKifu) === 'true'
  }

  async setPaintTargets(b: boolean): Promise<void> {
    this.paintTargets = b
    if (this.saveToLocalStorage) this.set(this.keys.paintTargets, String(b))
  }

  async setServerURL(s: string): Promise<void> {
    this.serverURL = s
    if (this.saveToLocalStorage) this.set(this.keys.serverURL, s)
  }

  async setSaveToLocalStorage(b: boolean): Promise<void> {
    this.saveToLocalStorage = b
    const { saveToLocalStorage, serverURL, paintTargets, storeKifu } = this.keys

    if (this.saveToLocalStorage) {
      this.set(saveToLocalStorage, `${b}`)
      this.set(serverURL, this.serverURL)
      this.set(paintTargets, `${this.paintTargets}`)
      this.set(storeKifu, `${this.storeKifu}`)
      return
    }

    // false なら削除する
    const keys = [saveToLocalStorage, serverURL, paintTargets, storeKifu]
    keys.forEach(key => this.remove(key))
  }

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

  async setAppWidth(w?: number): Promise<void> {
    if (!w) {
      this.appWidth = null
      this.remove(this.keys.appWidth)
      return
    }
    this.appWidth = w
    if (this.saveBoardWidth) this.saveAppWidth(w)
  }

  saveAppWidth = debounce(
    (w: number) => this.set(this.keys.appWidth, `${w}`),
    1000
  )

  async setStoreKifu(b: boolean): Promise<void> {
    this.storeKifu = b
    if (this.saveToLocalStorage) this.set(this.keys.storeKifu, String(b))
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
