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
  d.mockImplementation((cb, duration) => () => cb())
})

it('初期化して値を更新できる', async () => {
  const config = new DefaultConfig()
  expect(config.paintTargets).toBeTruthy()
  expect(config.serverURL).toBe('')
  expect(config.saveToLocalStorage).toBeFalsy()
  expect(config.saveBoardWidth).toBeFalsy()
  expect(config.appWidth).toBeNull()
  expect(config.storeKifu).toBeFalsy()
  expect(get).toHaveBeenCalledTimes(5)

  await config.setPaintTargets(false)
  expect(set).toHaveBeenCalledTimes(0) // localStorage には保存しない
  expect(config.paintTargets).toBeFalsy()

  await config.setSaveToLocalStorage(true)
  expect(config.saveToLocalStorage).toBeTruthy()
  expect(set).toHaveBeenCalledTimes(4) // 他の値も保存される

  const url = 'http://localhost/abc/def'
  await config.setServerURL(url)
  expect(config.serverURL).toBe(url)
  expect(set).toHaveBeenCalledTimes(5)

  await config.setSaveBoardWidth(true)
  expect(config.saveBoardWidth).toBeTruthy()
  expect(set).toHaveBeenCalledTimes(6) // appWidth は null なので保存されない
  await config.setSaveBoardWidth(false)
  expect(remove).toHaveBeenCalledTimes(2)

  const width1 = 800
  await config.setAppWidth(width1)
  expect(config.appWidth).toBe(width1)
  expect(set).toHaveBeenCalledTimes(6) // 呼ばれない

  await config.setSaveBoardWidth(true)
  expect(config.saveBoardWidth).toBeTruthy()
  expect(set).toHaveBeenCalledTimes(8) // 呼ばれる

  const width2 = 1000
  await config.setAppWidth(width2)
  expect(config.appWidth).toBe(width2)
  expect(set).toHaveBeenCalledTimes(9)

  await config.setSaveBoardWidth(false)
  expect(remove).toHaveBeenCalledTimes(4)

  await config.setSaveToLocalStorage(false)
  expect(remove).toHaveBeenCalledTimes(8)

  await config.setStoreKifu(true)
  expect(config.storeKifu).toBeTruthy()
})

it('savePaintTargets', async () => {
  const config = new DefaultConfig()
  config.saveToLocalStorage = true // localStorege.set が走らないように直接代入
  expect(set).toHaveBeenCalledTimes(0)
  await config.setPaintTargets(true)
  expect(set).toHaveBeenCalledTimes(1)
  await config.setPaintTargets(false)
  expect(set).toHaveBeenCalledTimes(2)
})

it('setServerUrl 1', async () => {
  const config = new DefaultConfig()
  config.saveToLocalStorage = true // localStorege.set が走らないように直接代入
  expect(set).toHaveBeenCalledTimes(0)
  await config.setServerURL('url')
  expect(set).toHaveBeenCalledTimes(1)
})

it('setServerUrl 2', async () => {
  const config = new DefaultConfig()
  expect(set).toHaveBeenCalledTimes(0)
  await config.setServerURL('url')
  expect(set).toHaveBeenCalledTimes(0)
})

it('初期値を読み込める', async () => {
  const width = 1000
  const url = 'http://localhost/abc/def'
  get.mockImplementation(key => {
    if (key === 'appWidth') return `${width}`
    if (key === 'paintTargets') return `${false}`
    if (key === 'serverURL') return `${url}`
    if (key === 'saveToLocalStorage') return `${true}`
    if (key === 'saveBoardWidth') return `${true}`
    if (key === 'storeKifu') return `${false}`
    return null
  })

  const config = new DefaultConfig()
  expect(config.appWidth).toBe(width)
  expect(config.paintTargets).toBeFalsy()
  expect(config.serverURL).toBe(url)
  expect(config.saveToLocalStorage).toBeTruthy()
  expect(config.saveBoardWidth).toBeTruthy()
})

it('appWidth に変な値が来たらセットしない1', async () => {
  get.mockImplementation(key => {
    if (key === 'saveBoardWidth') return `${true}`
    if (key === 'appWidth') return `aiueo`
    return null
  })
  const config = new DefaultConfig()
  expect(config.appWidth).toBeNull()
})

it('appWidth に変な値が来たらセットしない2', async () => {
  get.mockImplementation(key => {
    if (key === 'saveBoardWidth') return `${true}`
    return null
  })
  const config = new DefaultConfig()
  expect(config.appWidth).toBeNull()
})
