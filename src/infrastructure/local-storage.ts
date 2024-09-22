import { KifuFormats, KifuParser } from '../lib/parser/parsers/kifu'
import Kifu from '../model/kifu/Kifu'

export abstract class LocalStorageAPI {
  protected set(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  protected setBoolean(key: string, value: boolean): void {
    this.set(key, String(value))
  }

  protected setNumber(key: string, value: number): void {
    this.set(key, String(value))
  }

  protected get(key: string): string | null {
    return localStorage.getItem(key)
  }

  protected getDefaultFalseBoolean(key: string): boolean {
    return this.get(key) === 'true'
  }
  protected getDefaultTrueBoolean(key: string): boolean {
    return !(this.get(key) === 'false')
  }

  protected getNumber(key: string): number | null {
    const v = this.get(key)
    if (!v) return null

    const n = Number(v)
    if (isNaN(n)) return null
    return n
  }

  protected delete(key: string): void {
    localStorage.removeItem(key)
  }

  protected deleteAll(): void {
    localStorage.clear()
  }
}

export class ConfigStorage extends LocalStorageAPI {
  private readonly keys = {
    paintTargets: 'paintTargets',
    serverURL: 'serverURL',
    saveKifuToLocalStorage: 'saveKifu',
  }

  getPaintTargets(): boolean {
    return this.getDefaultTrueBoolean(this.keys.paintTargets)
  }

  setPaintTargets(v: boolean): void {
    this.setBoolean(this.keys.paintTargets, v)
  }

  getServerURL(): string {
    return this.get(this.keys.serverURL) || ''
  }

  setServerURL(v: string): void {
    this.set(this.keys.serverURL, v)
  }

  getSaveKifuToLocalStorage(): boolean {
    return this.getDefaultFalseBoolean(this.keys.saveKifuToLocalStorage)
  }

  setSaveKifuToLocalStorage(v: boolean) {
    this.setBoolean(this.keys.saveKifuToLocalStorage, v)
  }

  clear(): void {
    Object.values(this.keys).forEach(key => this.delete(key))
  }
}

export class BoardWidthStorage extends LocalStorageAPI {
  private readonly keys = {
    saveBoardWidth: 'saveBoardWidth',
    boardWidth: 'boardWidth',
  }

  getBoardWidth(): { save: boolean; width: number | null } {
    return {
      save: this.getDefaultFalseBoolean(this.keys.saveBoardWidth),
      width: this.getNumber(this.keys.boardWidth),
    }
  }

  setBoardWidth(save: boolean, v: number | null): void {
    this.setBoolean(this.keys.saveBoardWidth, save)
    if (!save) this.delete(this.keys.boardWidth)
    else if (v === null) this.delete(this.keys.boardWidth)
    else this.setNumber(this.keys.boardWidth, v)
  }

  clear(): void {
    Object.values(this.keys).forEach(key => this.delete(key))
  }
}

export class KifuStorage extends LocalStorageAPI {
  private readonly keys = {
    kifuV1: 'kifu.v1',
  }

  getKifu(): Kifu | null {
    const v = this.get(this.keys.kifuV1)
    if (!v) return null

    const parsed = KifuParser(KifuFormats.json).parse(v)
    if (!parsed) return null
    return parsed.value
  }

  setKifu(v: Kifu): void {
    const s = JSON.stringify(v)
    this.set(this.keys.kifuV1, s)
  }

  deleteKifu(): void {
    this.delete(this.keys.kifuV1)
  }
}
