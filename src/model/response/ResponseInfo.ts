import { ResponseMove } from './ResponseMove'

export interface ResponseInfo {
  values: Map<string, number>
  score: number
  moves: ResponseMove[]
}
