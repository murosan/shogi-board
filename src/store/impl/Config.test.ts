import debounce from 'lodash.debounce'
import { DefaultConfig } from './Config'

const get = jest.fn()
const set = jest.fn()
const remove = jest.fn()

const localStorage = {
  getItem: get,
  setItem: set,
  removeItem: remove,
}
Object.defineProperty(window, 'localStorage', { value: localStorage })

jest.mock('lodash.debounce')

beforeEach(() => {
  get.mockClear()
  set.mockClear()
  remove.mockClear()

  get.mockImplementation((key: string) => null)
  set.mockImplementation((key: string, value: string) => {})
  remove.mockImplementation((key: string) => {})

  const d = debounce as jest.Mock
  d.mockClear()
  d.mockImplementation((cb, duration) => (arg: any) => cb(arg))
})

function resetTimes() {
  get.mockReset()
  set.mockReset()
  remove.mockReset()
}

it('初期化して値を更新できる', async () => {
  const config = new DefaultConfig()
  expect(config.paintTargets).toBeTruthy()
  expect(config.serverURL).toBe('')
  expect(config.boardWidth.save).toBeFalsy()
  expect(config.boardWidth.width).toBeNull()
  expect(config.saveKifuToLocalStorage).toBeFalsy()
  expect(get).toHaveBeenCalledTimes(5)

  resetTimes()

  await config.setPaintTargets(false)
  expect(set).toHaveBeenCalledTimes(1)
  expect(config.paintTargets).toBeFalsy()

  resetTimes()

  const url = 'http://localhost/abc/def'
  await config.setServerURL(url)
  expect(config.serverURL).toBe(url)
  expect(set).toHaveBeenCalledTimes(1)

  resetTimes()

  await config.setSaveBoardWidth(true)
  expect(config.boardWidth.save).toBeTruthy()
  expect(set).toHaveBeenCalledTimes(1) // 幅がnullなのでsaveだけ呼ばれる
  expect(remove).toHaveBeenCalledTimes(1) // 幅がnullなのでremoveが呼ばれる
  await config.setSaveBoardWidth(false)
  expect(remove).toHaveBeenCalledTimes(3)

  resetTimes()

  const width1 = 800
  await config.setBoardWidth(width1)
  expect(config.boardWidth.width).toBe(width1)
  expect(set).toHaveBeenCalledTimes(0) // saveBoardWidthがfalseなので呼ばれない

  resetTimes()

  await config.setSaveBoardWidth(true)
  expect(config.boardWidth.save).toBeTruthy()
  expect(set).toHaveBeenCalledTimes(2) // saveBoardWidthがtrueなので呼ばれる

  resetTimes()

  const width2 = 1000
  await config.setBoardWidth(width2)
  expect(config.boardWidth.width).toBe(width2)
  expect(set).toHaveBeenCalledTimes(2)

  resetTimes()

  await config.setSaveBoardWidth(false)
  expect(remove).toHaveBeenCalledTimes(2) // boardWidthも同時に削除

  resetTimes()

  await config.setSaveKifuToLocalStorage(true)
  expect(config.saveKifuToLocalStorage).toBeTruthy()
  expect(set).toHaveBeenCalledTimes(1)
})

it('savePaintTargets', async () => {
  const config = new DefaultConfig()
  expect(set).toHaveBeenCalledTimes(0)
  await config.setPaintTargets(true)
  expect(set).toHaveBeenCalledTimes(1)
  await config.setPaintTargets(false)
  expect(set).toHaveBeenCalledTimes(2)
})

it('setServerUrl 1', async () => {
  const config = new DefaultConfig()
  expect(set).toHaveBeenCalledTimes(0)
  await config.setServerURL('url')
  expect(set).toHaveBeenCalledTimes(1)
})

it('初期値を読み込める', async () => {
  const width = 1000
  const url = 'http://localhost/abc/def'
  get.mockImplementation(key => {
    if (key === 'paintTargets') return `${false}`
    if (key === 'serverURL') return `${url}`
    if (key === 'saveBoardWidth') return `${true}`
    if (key === 'boardWidth') return `${width}`
    if (key === 'saveKifu') return `${false}`
    return null
  })

  const config = new DefaultConfig()
  expect(config.boardWidth.width).toBe(width)
  expect(config.paintTargets).toBeFalsy()
  expect(config.serverURL).toBe(url)
  expect(config.boardWidth.save).toBeTruthy()
})

it('width に変な値が来たらセットしない1', async () => {
  get.mockImplementation(key => {
    if (key === 'saveBoardWidth') return `${true}`
    if (key === 'boardWidth') return `aiueo`
    return null
  })
  const config = new DefaultConfig()
  expect(config.boardWidth.width).toBeNull()
})

it('width に変な値が来たらセットしない2', async () => {
  get.mockImplementation(key => {
    if (key === 'saveBoardWidth') return `${true}`
    return null
  })
  const config = new DefaultConfig()
  expect(config.boardWidth.width).toBeNull()
})
