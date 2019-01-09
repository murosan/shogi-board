import { intoView } from './intoView'

const MOCK_ID = 'mockId'

it('scrollIntoView を実行できる', async () => {
  let result: boolean = false

  const mockDiv: any = document.createElement('div')
  mockDiv.scrollIntoViewIfNeeded = () => (result = true)

  document.getElementById = () => mockDiv

  intoView(MOCK_ID)
  expect(result).toBeTruthy()
})

it('DOMを取得できなかったら scrollIntoView は実行されない', async () => {
  let result: boolean = false

  const mockDiv: any = document.createElement('div')
  mockDiv.scrollIntoViewIfNeeded = () => (result = true)

  document.getElementById = () => null

  intoView(MOCK_ID)
  expect(result).toBeFalsy()
})
