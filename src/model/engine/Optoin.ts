import { observable, action } from 'mobx'

interface Option<T> {
  readonly name: string
  setValue(value: T): void
}

export class Button implements Option<any> {
  readonly name: string
  constructor(name: string) {
    this.name = name
  }

  setValue(_: any): void {}
}

export class Check implements Option<boolean> {
  @observable val: boolean
  readonly name: string
  readonly default: boolean
  constructor(name: string, val: boolean, initial: boolean) {
    this.name = name
    this.val = val
    this.default = initial
  }

  @action setValue(value: boolean): void {
    this.val = value
  }
}

export class Spin implements Option<string> {
  @observable val: number
  @observable inputValue: string
  readonly name: string
  readonly default: number
  readonly min: number
  readonly max: number
  constructor(
    name: string,
    val: number,
    initial: number,
    min: number,
    max: number
  ) {
    this.name = name
    this.val = val
    this.inputValue = val.toString()
    this.default = initial
    this.min = min
    this.max = max
  }

  @action setValue(value: string): void {
    this.inputValue = value
    const n: number = Number(this.inputValue)
    if (Number.isNaN(n) || n < this.min || n > this.max) return
    this.val = n
  }
}

export class Select implements Option<string> {
  @observable val: string
  readonly name: string
  readonly default: string
  readonly vars: string[]
  constructor(name: string, val: string, initial: string, vars: string[]) {
    this.name = name
    this.val = val
    this.default = initial
    this.vars = vars
  }

  @action setValue(value: string) {
    this.val = value
  }
}

export class Str implements Option<string> {
  @observable val: string
  readonly name: string
  readonly default: string
  constructor(name: string, val: string, initial: string) {
    this.name = name
    this.val = val
    this.default = initial
  }

  @action setValue(value: string) {
    this.val = value
  }
}

export class String extends Str {
  constructor(name: string, val: string, initial: string) {
    super(name, val, initial)
  }
}

export class Filename extends Str {
  constructor(name: string, val: string, initial: string) {
    super(name, val, initial)
  }
}

export interface Options {
  buttons: Map<string, Button>
  checks: Map<string, Check>
  spins: Map<string, Spin>
  selects: Map<string, Select>
  strings: Map<string, String>
  filenames: Map<string, Filename>
}
