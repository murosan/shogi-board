import { action, observable } from 'mobx'

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
  @observable value: boolean
  readonly name: string
  readonly default: boolean
  constructor(name: string, value: boolean, initial: boolean) {
    this.name = name
    this.value = value
    this.default = initial
  }

  @action setValue(value: boolean): void {
    this.value = value
  }
}

export class Range implements Option<string> {
  @observable value: number
  @observable inputValue: string
  readonly name: string
  readonly default: number
  readonly min: number
  readonly max: number
  constructor(
    name: string,
    value: number,
    initial: number,
    min: number,
    max: number
  ) {
    this.name = name
    this.value = value
    this.inputValue = value.toString()
    this.default = initial
    this.min = min
    this.max = max
  }

  @action setValue(value: string): void {
    this.inputValue = value
    const n: number = Number(this.inputValue)
    if (Number.isNaN(n) || n < this.min || n > this.max) return
    this.value = n
  }
}

export class Select implements Option<string> {
  @observable value: string
  readonly name: string
  readonly default: string
  readonly vars: string[]
  constructor(name: string, value: string, initial: string, vars: string[]) {
    this.name = name
    this.value = value
    this.default = initial
    this.vars = vars
  }

  @action setValue(value: string) {
    this.value = value
  }
}

export class Text implements Option<string> {
  @observable value: string
  readonly name: string
  readonly default: string

  constructor(name: string, value: string, initial: string) {
    this.name = name
    this.value = value
    this.default = initial
  }

  @action setValue(value: string) {
    this.value = value
  }
}

export interface Options {
  buttons: Map<string, Button>
  checks: Map<string, Check>
  ranges: Map<string, Range>
  selects: Map<string, Select>
  texts: Map<string, Text>
}
