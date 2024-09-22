import debounce from 'lodash.debounce'
import { action, makeObservable, observable } from 'mobx'
import {
  BoardWidthStorage,
  ConfigStorage,
} from '../../infrastructure/local-storage'
import { Config } from '../Config'

export class DefaultConfig implements Config {
  paintTargets: boolean
  serverURL: string
  boardWidth: {
    save: boolean
    width: number | null
  }
  saveKifuToLocalStorage: boolean

  private storage = new ConfigStorage()
  private boardWidthStorage = new BoardWidthStorage()

  constructor() {
    makeObservable(this, {
      paintTargets: observable,
      serverURL: observable,
      boardWidth: observable,
      saveKifuToLocalStorage: observable,

      setPaintTargets: action,
      setServerURL: action,
      setSaveBoardWidth: action,
      setBoardWidth: action,
      setSaveKifuToLocalStorage: action,
    })

    this.paintTargets = this.storage.getPaintTargets()
    this.serverURL = this.storage.getServerURL()
    this.boardWidth = this.boardWidthStorage.getBoardWidth()
    this.saveKifuToLocalStorage = this.storage.getSaveKifuToLocalStorage()
  }

  async setPaintTargets(b: boolean): Promise<void> {
    this.paintTargets = b
    this.storage.setPaintTargets(b)
  }

  async setServerURL(s: string): Promise<void> {
    this.serverURL = s
    this.storage.setServerURL(s)
  }

  async setSaveBoardWidth(b: boolean): Promise<void> {
    const w = this.boardWidth.width
    this.boardWidth = { width: w, save: b }
    this.saveBoardWidthDebounce({ save: b, width: w })
  }

  async setBoardWidth(v: number | null): Promise<void> {
    const save = this.boardWidth.save
    this.boardWidth = { save, width: v }
    if (save) this.saveBoardWidthDebounce({ save, width: v })
  }

  saveBoardWidthDebounce = debounce(
    (arg: { save: boolean; width: number | null }) => {
      if (arg.save) this.boardWidthStorage.setBoardWidth(arg.save, arg.width)
      else this.boardWidthStorage.clear()
    },
    1000
  )

  async setSaveKifuToLocalStorage(b: boolean): Promise<void> {
    this.saveKifuToLocalStorage = b
    this.storage.setSaveKifuToLocalStorage(b)
  }
}
