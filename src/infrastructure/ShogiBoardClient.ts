import axios from 'axios'
import debounce from 'lodash.debounce'
import shortid from 'shortid'
import { promote } from '../handler/game/piece'
import { move } from '../handler/game/position'
import { Info } from '../model/engine/Info'
import {
  Button,
  Check,
  Options,
  Range,
  Select,
  Text,
} from '../model/engine/Optoin'
import { MoveProps } from '../model/events/MoveProps'
import { Move } from '../model/kifu/Move'
import { ResponseInfo } from '../model/response/ResponseInfo'
import { Empty } from '../model/shogi/Piece'
import { Position } from '../model/shogi/Position'

const DEBOUNCE_MILLIS = 1000

export class ShogiBoardClient {
  private _engineName?: string
  private _serverURL?: string

  private readonly engineNameKey = 'key'

  constructor(engineName?: string, serverURL?: string) {
    this._engineName = engineName
    this._serverURL = serverURL
  }

  set engineName(name: string) {
    this._engineName = name
  }

  get engineName(): string {
    if (!this._engineName) throw new Error('engineName is not defined.')
    return this._engineName
  }

  set serverURL(url: string) {
    this._serverURL = url
  }

  get serverURL(): string {
    if (!this._serverURL) throw new Error('serverURL is not defined. serverURL')
    return this._serverURL
  }

  async init(): Promise<string[]> {
    const url = await this.buildUrl('init', false)
    const res = await axios.post(url)
    return res.data
  }

  async connect(): Promise<void> {
    return await this.post('connect')
  }

  async close(): Promise<void> {
    return await this.post('close')
  }

  async start(): Promise<void> {
    return await this.post('start')
  }

  async stop(): Promise<void> {
    return await this.post('stop')
  }

  async getOptions(): Promise<Options> {
    // res は Options と言いつつ、中身は Map じゃなくて object
    // TODO: データの持ち方考える
    const res: Options = await this.get('options/get')
    const m: Options = {
      buttons: new Map(),
      checks: new Map(),
      ranges: new Map(),
      selects: new Map(),
      texts: new Map(),
    }
    Object.values(res.buttons).forEach(b =>
      m.buttons.set(b.name, new Button(b.name))
    )
    Object.values(res.checks).forEach(c =>
      m.checks.set(c.name, new Check(c.name, c.value, c.default))
    )
    Object.values(res.ranges).forEach(r =>
      m.ranges.set(r.name, new Range(r.name, r.value, r.default, r.min, r.max))
    )
    Object.values(res.selects).forEach(s =>
      m.selects.set(s.name, new Select(s.name, s.value, s.default, s.vars))
    )
    Object.values(res.texts).forEach(t =>
      m.texts.set(t.name, new Text(t.name, t.value, t.default))
    )
    return m
  }

  async updateButton(btn: Button): Promise<void> {
    return await this.post('options/update/button', btn)
  }

  async updateCheck(chk: Check): Promise<void> {
    return await this.post('options/update/check', chk)
  }

  updateRange = debounce(async (rng: Range): Promise<void> => {
    return await this.post('options/update/range', rng)
  }, DEBOUNCE_MILLIS)

  async updateSelect(sel: Select): Promise<void> {
    return await this.post('options/update/select', sel)
  }

  updateText = debounce(async (txt: Text): Promise<void> => {
    return await this.post('options/update/text', txt)
  }, DEBOUNCE_MILLIS)

  async getResult(current: Move): Promise<Info[]> {
    const resp: { number: ResponseInfo } = await this.get('result/get')
    let p: Position = current.pos

    // レスポンスのキーでソートされた ResponseInfo を取り出し、
    // move メソッドで局面を動かしながら Info を生成していく
    return Object.entries(resp)
      .sort((a, b) => {
        if (a[0] < b[0]) return -1
        if (a[0] > b[0]) return 1
        return 0
      })
      .map(([_, info]) => {
        let i: number = 0
        p = current.pos
        const moves: MoveProps[] = []

        try {
          while (i < info.moves.length) {
            const m = info.moves[i]
            const source = { row: m.source!.row, column: m.source!.column }
            const dest = { row: m.dest!.row, column: m.dest!.column }
            const piece = m.pieceId || p.pos[source.row][source.column]
            if (piece === Empty) break
            const mp: MoveProps = {
              pos: p,
              source,
              dest,
              piece: m.isPromoted ? promote(piece) : piece,
              promote: m.isPromoted,
            }
            moves.push(mp)
            p = move(mp)
            i = (i + 1) | 0
          }
        } catch (e) {
          // ズレは出るのでエラーは握りつぶす
          // console.error(i, p, e)
        }

        const values = new Map()
        Object.entries(info.values).forEach(([k, v]) => values.set(k, v))

        return {
          id: shortid.generate(),
          values, // 一旦捨てる
          score: info.score * current.pos.turn, // 後手番なら -1 をかける
          moves,
        }
      })
  }

  async setPosition(p: Position): Promise<void> {
    const pos: Position = {
      pos: p.pos.map(r => r.slice().reverse()),
      cap0: p.cap0,
      cap1: p.cap1,
      turn: p.turn,
      moveCount: p.moveCount,
    }
    return await this.post('position/set', pos)
  }

  private async get<T>(path: string): Promise<T> {
    const url = await this.buildUrl(path, true)
    const res = await axios.get(url)
    return res.data
  }

  private async post(path: string, body?: object): Promise<void> {
    const url = await this.buildUrl(path, true)
    await axios.post(url, body, {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  private async buildUrl(path: string, withName: boolean) {
    const e = (s: string) => encodeURIComponent(s)
    const query = withName ? `?${this.engineNameKey}=${e(this.engineName)}` : ''
    return `${this.serverURL}/${path}${query}`
  }

  private e(s: any): string {
    return encodeURIComponent(s)
  }
}
