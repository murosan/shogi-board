import { Error } from 'grpc-web'
import { config } from '../config/Config'
import * as Pos from '../model/shogi/Position'
import { ShogiBoardClient } from './V1ServiceClientPb'
import {
  EngineName,
  EngineNames,
  Options,
  Position,
  Request,
  Response,
  Result,
  Row,
  SetPositionRequest,
} from './v1_pb'

/**
 * ShogiBoardClient の非同期ラッパー
 */
export class PbClient {
  _engineName?: string
  client: ShogiBoardClient
  constructor(engineName?: string) {
    this._engineName = engineName
    this.client = new ShogiBoardClient(serverURL(), {}, {})
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
      this.client.getOptions(en, {}, (err: Error, res: Options) => {
        if (err) reject(err)
        resolve(res)
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

  async setPosition(pos: Pos.default): Promise<void> {
    const en: EngineName = await this.getEngineName()
    const p: Position = new Position()
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
