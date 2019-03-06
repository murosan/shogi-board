import { observable } from 'mobx'

class Option {
  name: string
  constructor(name: string) {
    this.name = name
  }
}

export class Button extends Option {
  constructor(name: string) {
    super(name)
  }
}

export class Check extends Option {
  @observable val: boolean
  default: boolean
  constructor(name: string, val: boolean, initial: boolean) {
    super(name)
    this.val = val
    this.default = initial
  }
}

export class Spin extends Option {
  @observable val: number
  default: number
  min: number
  max: number
  constructor(
    name: string,
    val: number,
    initial: number,
    min: number,
    max: number
  ) {
    super(name)
    this.val = val
    this.default = initial
    this.min = min
    this.max = max
  }
}

export class Select extends Option {
  @observable val: string
  default: string
  vars: string[]
  constructor(name: string, val: string, initial: string, vars: string[]) {
    super(name)
    this.val = val
    this.default = initial
    this.vars = vars
  }
}

class Str extends Option {
  @observable val: string
  default: string
  constructor(name: string, val: string, initial: string) {
    super(name)
    this.val = val
    this.default = initial
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
