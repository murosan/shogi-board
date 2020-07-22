import { getHostname } from './url'

it('hostname を取得できる', () => {
  const expected = 'localhost'
  expect(getHostname()).toBe(expected)
})
