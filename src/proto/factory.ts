import { Error } from 'grpc-web'
import debounce from 'lodash.debounce'
import { config } from '../config/Config'
import {
  Button,
  Check,
  Filename,
  Options,
  Select,
  Spin,
  String,
} from '../model/engine/Optoin'
import Position from '../model/shogi/Position'
import { ShogiBoardClient as PbClient } from './V1ServiceClientPb'
import {
  Button as PbButton,
  Check as PbCheck,
  EngineName,
  EngineNames,
  Filename as PbFilename,
  Options as PbOptions,
  Position as PbPosition,
  Request,
  Response,
  Result,
  Row,
  Select as PbSelect,
  SetPositionRequest,
  Spin as PbSpin,
  String as PbString,
  UpdateButtonRequest,
  UpdateCheckRequest,
  UpdateFilenameRequest,
  UpdateSelectRequest,
  UpdateSpinRequest,
  UpdateStringRequest,
} from './v1_pb'

const DEBOUNCE_MILLIS = 1000

/**
 * ShogiBoardClient の非同期ラッパー
 */
export class ShogiBoardClient {
  _engineName?: string
  client: PbClient

  updateSpin: (s: Spin) => Promise<void>
  updateString: (s: String) => Promise<void>
  updateFilename: (f: Filename) => Promise<void>

  constructor(engineName?: string) {
    this._engineName = engineName
    this.client = new PbClient(serverURL(), {}, {})

    this.updateSpin = debounce(this.updateSpinImpl, DEBOUNCE_MILLIS)
    this.updateString = debounce(this.updateStringImpl, DEBOUNCE_MILLIS)
    this.updateFilename = debounce(this.updateFilenameImpl, DEBOUNCE_MILLIS)
  }

  set engineName(name: string) {
    this._engineName = name
  }

  get engineName(): string {
    if (!this._engineName)
      throw new Error(
        'engineName is not defined. engineName=' + this._engineName
      )
    return this._engineName
  }

  async initialize(): Promise<string[]> {
    const req = new Request()
    return new Promise((resolve, reject) => {
      this.client.initialize(req, {}, (err: Error, res: EngineNames) => {
        if (err) reject(err)
        resolve(res.getEnginesList())
      })
    })
  }

  async getOptions(): Promise<Options> {
    const en: EngineName = await this.getEngineName()
    return new Promise((resolve, reject) => {
      this.client.getOptions(en, {}, (err: Error, res: PbOptions) => {
        if (err) reject(err)
        const buttons: Map<string, Button> = new Map()
        const checks: Map<string, Check> = new Map()
        const spins: Map<string, Spin> = new Map()
        const selects: Map<string, Select> = new Map()
        const strings: Map<string, String> = new Map()
        const filenames: Map<string, Filename> = new Map()
        const obj: any = res.toObject()
        // FIXME: なぜか、.d.ts を見ると buttonsMap が buttonsList になってるっぽい..
        obj.buttonsMap.forEach((b: any) => buttons.set(b[0], new Button(b[0])))
        obj.checksMap.forEach((v: any) => {
          const { name, val, pb_default } = v[1]
          const c = new Check(name, val, pb_default)
          checks.set(name, c)
        })
        obj.spinsMap.forEach((v: any) => {
          const { name, val, pb_default, min, max } = v[1]
          const s = new Spin(name, val, pb_default, min, max)
          spins.set(name, s)
        })
        obj.selectsMap.forEach((v: any) => {
          const { name, val, pb_default, vars } = v[1]
          const s = new Select(name, val, pb_default, vars)
          selects.set(name, s)
        })
        obj.stringsMap.forEach((v: any) => {
          const { name, val, pb_default } = v[1]
          const s = new String(name, val, pb_default)
          strings.set(name, s)
        })
        obj.filenamesMap.forEach((v: any) => {
          const { name, val, pb_default } = v[1]
          const f = new Filename(name, val, pb_default)
          filenames.set(name, f)
        })

        const opts: Options = {
          buttons,
          checks,
          spins,
          selects,
          strings,
          filenames,
        }
        resolve(opts)
      })
    })
  }

  async connect(): Promise<void> {
    const en: EngineName = await this.getEngineName()
    return new Promise((resolve, reject) => {
      this.client.connect(en, {}, (err: Error, res: Response) => {
        if (err) reject(err)
        resolve()
      })
    })
  }

  async close(): Promise<void> {
    const en: EngineName = await this.getEngineName()
    return new Promise((resolve, reject) => {
      this.client.close(en, {}, (err: Error, res: Response) => {
        if (err) reject(err)
        resolve()
      })
    })
  }

  async start(): Promise<void> {
    const en: EngineName = await this.getEngineName()
    return new Promise((resolve, reject) => {
      this.client.start(en, {}, (err: Error, res: Response) => {
        if (err) reject(err)
        resolve()
      })
    })
  }

  async stop(): Promise<void> {
    const en: EngineName = await this.getEngineName()
    return new Promise((resolve, reject) => {
      this.client.stop(en, {}, (err: Error, res: Response) => {
        if (err) reject(err)
        resolve()
      })
    })
  }

  async setPosition(pos: Position): Promise<void> {
    const en: EngineName = await this.getEngineName()
    const p: PbPosition = new PbPosition()
    p.setTurn(pos.turn)
    p.setMovecount(pos.moveCount)
    p.setCap0List(pos.cap0)
    p.setCap1List(pos.cap1)
    p.setPosList(
      pos.pos.map(r => {
        const row: Row = new Row()
        row.setRowList(r)
        return row
      })
    )
    const req: SetPositionRequest = new SetPositionRequest()
    req.setEngine(en)
    req.setPos(p)
    return new Promise((resolve, reject) => {
      this.client.setPosition(req, {}, (err: Error, res: Response) => {
        if (err) reject(err)
        resolve()
      })
    })
  }

  async getResult(): Promise<Result> {
    const en: EngineName = await this.getEngineName()
    return new Promise((resolve, reject) => {
      this.client.getResult(en, {}, (err: Error, res: Result) => {
        if (err) reject(err)
        resolve(res)
      })
    })
  }

  async updateButton(b: Button): Promise<void> {
    console.log('update button')
    const en: EngineName = await this.getEngineName()
    const btn: PbButton = new PbButton()
    btn.setName(b.name)
    const req: UpdateButtonRequest = new UpdateButtonRequest()
    req.setEngine(en)
    req.setButton(btn)
    this.client.updateButton(req, {}, (err: Error, res: Response) => {
      if (err) console.error(err)
    })
  }
  async updateCheck(c: Check): Promise<void> {
    console.log('update check', c.val)
    const en: EngineName = await this.getEngineName()
    const chk: PbCheck = new PbCheck()
    chk.setName(c.name)
    chk.setDefault(c.default)
    chk.setVal(c.val)
    const req: UpdateCheckRequest = new UpdateCheckRequest()
    req.setEngine(en)
    req.setCheck(chk)
    this.client.updateCheck(req, {}, (err: Error, res: Response) => {
      if (err) console.error(err)
    })
  }

  private async updateSpinImpl(s: Spin): Promise<void> {
    console.log('update spin', s.val)
    const en: EngineName = await this.getEngineName()
    const spn: PbSpin = new PbSpin()
    spn.setName(s.name)
    spn.setDefault(s.default)
    spn.setMin(s.min)
    spn.setMax(s.max)
    spn.setVal(s.val)
    const req: UpdateSpinRequest = new UpdateSpinRequest()
    req.setEngine(en)
    req.setSpin(spn)
    this.client.updateSpin(req, {}, (err: Error, res: Response) => {
      if (err) console.error(err)
    })
  }
  async updateSelect(s: Select): Promise<void> {
    console.log('update select', s.val)
    const en: EngineName = await this.getEngineName()
    const sel: PbSelect = new PbSelect()
    sel.setName(s.name)
    sel.setDefault(s.default)
    sel.setVarsList(s.vars)
    sel.setVal(s.val)
    const req: UpdateSelectRequest = new UpdateSelectRequest()
    req.setEngine(en)
    req.setSelect(sel)
    this.client.updateSelect(req, {}, (err: Error, res: Response) => {
      if (err) console.error(err)
    })
  }
  private async updateStringImpl(s: String): Promise<void> {
    console.log('update string', s.val)
    const en: EngineName = await this.getEngineName()
    const str: PbString = new PbString()
    str.setName(s.name)
    str.setDefault(s.default)
    str.setVal(s.val)
    const req: UpdateStringRequest = new UpdateStringRequest()
    req.setEngine(en)
    req.setString(str)
    this.client.updateString(req, {}, (err: Error, res: Response) => {
      if (err) console.error(err)
    })
  }
  private async updateFilenameImpl(f: Filename): Promise<void> {
    console.log('update filename', f.val)
    const en: EngineName = await this.getEngineName()
    const fil: PbFilename = new PbFilename()
    fil.setName(f.name)
    fil.setDefault(f.default)
    fil.setVal(f.val)
    const req: UpdateFilenameRequest = new UpdateFilenameRequest()
    req.setEngine(en)
    req.setFilename(fil)
    this.client.updateFilename(req, {}, (err: Error, res: Response) => {
      if (err) console.error(err)
    })
  }

  private async getEngineName(): Promise<EngineName> {
    const en: EngineName = new EngineName()
    en.setName(this.engineName)
    return en
  }
}

function serverURL(): string {
  const url = config.serverURL
  if (!url)
    throw new Error(
      'The serverURL is not specified. Please check out the configuration file.'
    )
  return url
}
