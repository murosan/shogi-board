export interface Success<T> {
  value: T
  next: string
}
export type ParseResult<T> = Success<T> | null

export type ParserFunc<T> = (s: string) => ParseResult<T>
export type Parser<T> = {
  parse: ParserFunc<T>
  map<U>(f: (t: T) => U): Parser<U>
  comb<U>(right: Parser<U>): Parser<[T, U]>
  left<U>(right: Parser<U>): Parser<T>
  right<U>(right: Parser<U>): Parser<U>
  or(parser: Parser<T>): Parser<T>
  fallback(value: T): Parser<T>
  failif(cb: (v: T) => boolean): Parser<T>
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export function Parser<T>(pf: ParserFunc<T>): Parser<T> {
  return {
    parse: pf,

    map<U>(f: (t: T) => U): Parser<U> {
      return Parser(input => {
        const result = pf(input)
        if (!result) return null
        return { value: f(result.value), next: result.next }
      })
    },

    comb<U>(right: Parser<U>): Parser<[T, U]> {
      return Parser(input => {
        const l = pf(input)
        if (!l) return null
        const r = right.parse(l.next)
        if (!r) return null
        return { value: [l.value, r.value], next: r.next }
      })
    },

    left<U>(right: Parser<U>): Parser<T> {
      return Parser(input => {
        const l = pf(input)
        if (!l) return null
        const r = right.parse(l.next)
        if (!r) return null
        return { value: l.value, next: r.next }
      })
    },

    right<U>(right: Parser<U>): Parser<U> {
      return Parser(input => {
        const l = pf(input)
        if (!l) return null
        const r = right.parse(l.next)
        if (!r) return null
        return { value: r.value, next: r.next }
      })
    },

    or(parser: Parser<T>): Parser<T> {
      return Parser(input => pf(input) ?? parser.parse(input))
    },

    fallback(value: T): Parser<T> {
      return Parser(input => pf(input) ?? success(value, input))
    },

    failif(cb: (v: T) => boolean): Parser<T> {
      return Parser(input => {
        const r = pf(input)
        if (!r || cb(r.value)) return null
        return r
      })
    },
  }
}

export function success<T>(value: T, next: string): Success<T> {
  return { value, next }
}

export function successful<T>(value: T): Parser<T> {
  return Parser(input => ({ value, next: input }))
}

const ws = [' ', '\t', '\r', '\n']
const full = ws.concat('　') // 全角空白ありVer
export const space: Parser<string> = rep(oneOf(ws)).map(arr => arr.join(''))
export const fspace: Parser<string> = rep(oneOf(full)).map(arr => arr.join(''))

export function spacing<T>(parser: Parser<T>): Parser<T> {
  return space.right(parser).left(space)
}

export const s = (s: string) =>
  Parser(input => {
    if (!input.startsWith(s)) return null
    return { value: s, next: input.substring(s.length) }
  })

export const ss = (str: string) => spacing(s(str))
export const fss = (str: string) => fspace.right(s(str)).left(fspace)

// until が来るまでの文字列をパースする
export function literal(until: Parser<string> = oneOf(ws)): Parser<string> {
  return Parser(s => {
    if (s.length === 0) return null
    for (let i = 0; i < s.length; i++) {
      if (until.parse(s[i])) return success(s.slice(0, i), s.substring(i))
    }
    return success(s, '')
  })
}

export function rep<T>(parser: Parser<T>): Parser<T[]> {
  return Parser(input => {
    const value: T[] = []
    let next: string = input
    while (true) {
      const result: ParseResult<T> = parser.parse(next)
      if (!result) break
      value.push(result.value)
      next = result.next
    }
    return { value, next }
  })
}

export function repsep<T>(parser: Parser<T>, sep: Parser<string>): Parser<T[]> {
  return parser
    .comb(rep(sep.right(parser)))
    .map(([a, b]) => {
      const v = [a]
      for (let i = 0; i < b.length; i++) v.push(b[i])
      return v
    })
    .fallback([])
}

export function oneOf(s: string[]): Parser<string> {
  return Parser(input => {
    if (input.length === 0) return null
    for (let i = 0; i < s.length; i++) {
      if (s[i].length !== 1)
        throw new Error(
          'oneOfの引数にはには1文字だけで構成された配列を渡してください'
        )

      if (input[0] === s[i])
        return {
          value: input[0],
          next: input.substring(1),
        }
    }
    return null
  })
}
