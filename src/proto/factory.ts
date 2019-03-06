import { Error } from 'grpc-web'
import { config } from '../config/Config'
import {
  Options,
  Button,
  Check,
  Spin,
  Select,
  String,
  Filename,
} from '../model/engine/Optoin'
import Position from '../model/shogi/Position'
import { ShogiBoardClient as PbClient } from './V1ServiceClientPb'
import {
  EngineName,
  EngineNames,
  Options as PbOptions,
  Position as PbPosition,
  Request,
  Response,
  Result,
  Row,
  SetPositionRequest,
} from './v1_pb'

/**
 * ShogiBoardClient の非同期ラッパー
 */
export class ShogiBoardClient {
  _engineName?: string
  client: PbClient
  constructor(engineName?: string) {
    this._engineName = engineName
    this.client = new PbClient(serverURL(), {}, {})
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
        obj.buttonsMap.forEach((b: any) =>
          buttons.set(b[0], new Button(b[1].name))
        )
        obj.checksMap.forEach((v: any) => {
          const props = v[1]
          const c = new Check(props.name, props.val, props.pb_default)
          checks.set(props.name, c)
        })
        obj.spinsMap.forEach((v: any) => {
          const props = v[1]
          const s = new Spin(
            props.name,
            props.val,
            props.pb_default,
            props.min,
            props.max
          )
          spins.set(props.name, s)
        })
        obj.selectsMap.forEach((v: any) => {
          const props = v[1]
          const s = new Select(
            props.name,
            props.val,
            props.pb_default,
            props.vars
          )
          selects.set(props.name, s)
        })
        obj.stringsMap.forEach((v: any) => {
          const props = v[1]
          const s = new String(props.name, props.val, props.pb_default)
          strings.set(props.name, s)
        })
        obj.filenamesMap.forEach((v: any) => {
          const props = v[1]
          const f = new Filename(props.name, props.val, props.pb_default)
          strings.set(props.name, f)
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

  // TODO
  async updateButton(): Promise<void> {}
  async updateCheck(): Promise<void> {}
  async updateSpin(): Promise<void> {}
  async updateSelect(): Promise<void> {}
  async updateString(): Promise<void> {}
  async updateFilename(): Promise<void> {}

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
