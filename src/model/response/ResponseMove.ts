export interface ResponseMove {
  source: {
    row: number
    column: number
  }

  dest: {
    row: number
    column: number
  }

  pieceId: number

  isPromoted: boolean
}
