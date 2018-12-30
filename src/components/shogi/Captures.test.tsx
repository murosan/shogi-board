import { shallow } from 'enzyme'
import React from 'react'
import {
  Fu0,
  Fu1,
  Gin0,
  Gin1,
  Hisha0,
  Hisha1,
  Kaku0,
  Kaku1,
  Kei0,
  Kei1,
  Kin0,
  Kin1,
  Kyou0,
  Kyou1,
} from '../../model/shogi/Piece'
import GameStateStore from '../../store/GameStateStore'
import Captures from './Captures'

it('(RightSide)持ち駒のラッパー要素を正しくレンダリングできる', async () => {
  const gs: GameStateStore = new GameStateStore()
  const wrapper = shallow(
    <Captures
      gs={gs}
      isLeftSide={false}
      isTurn={true}
      captures={[1, 1, 1, 1, 1, 1, 1]}
    />
  ).dive()
  expect(wrapper.hasClass('Captures Captures0')).toBeTruthy()

  expect(wrapper.children()).toHaveLength(7)

  const hisha = 'Captures-Inner Captures-Hisha'
  expect(wrapper.childAt(0).hasClass(hisha)).toBeTruthy()
  const kaku = 'Captures-Inner Captures-Kaku'
  expect(wrapper.childAt(1).hasClass(kaku)).toBeTruthy()
  const kin = 'Captures-Inner Captures-Kin'
  expect(wrapper.childAt(2).hasClass(kin)).toBeTruthy()
  const gin = 'Captures-Inner Captures-Gin'
  expect(wrapper.childAt(3).hasClass(gin)).toBeTruthy()
  const kei = 'Captures-Inner Captures-Kei'
  expect(wrapper.childAt(4).hasClass(kei)).toBeTruthy()
  const kyou = 'Captures-Inner Captures-Kyou'
  expect(wrapper.childAt(5).hasClass(kyou)).toBeTruthy()
  const fu = 'Captures-Inner Captures-Fu'
  expect(wrapper.childAt(6).hasClass(fu)).toBeTruthy()
})

it('(LefttSide)持ち駒のラッパー要素を正しくレンダリングできる', async () => {
  const gs: GameStateStore = new GameStateStore()
  const wrapper = shallow(
    <Captures
      gs={gs}
      isLeftSide={true}
      isTurn={true}
      captures={[1, 1, 1, 1, 1, 1, 1]}
    />
  ).dive()
  expect(wrapper.hasClass('Captures Captures1')).toBeTruthy()

  expect(wrapper.children()).toHaveLength(7)

  const hisha = 'Captures-Inner Captures-Hisha'
  expect(wrapper.childAt(0).hasClass(hisha)).toBeTruthy()
  const kaku = 'Captures-Inner Captures-Kaku'
  expect(wrapper.childAt(1).hasClass(kaku)).toBeTruthy()
  const kin = 'Captures-Inner Captures-Kin'
  expect(wrapper.childAt(2).hasClass(kin)).toBeTruthy()
  const gin = 'Captures-Inner Captures-Gin'
  expect(wrapper.childAt(3).hasClass(gin)).toBeTruthy()
  const kei = 'Captures-Inner Captures-Kei'
  expect(wrapper.childAt(4).hasClass(kei)).toBeTruthy()
  const kyou = 'Captures-Inner Captures-Kyou'
  expect(wrapper.childAt(5).hasClass(kyou)).toBeTruthy()
  const fu = 'Captures-Inner Captures-Fu'
  expect(wrapper.childAt(6).hasClass(fu)).toBeTruthy()
})

it('(RightSide)持ち駒の枚数に応じて正しいクラス名が付く', async () => {
  const gs: GameStateStore = new GameStateStore()
  const wrapper = shallow(
    <Captures
      gs={gs}
      isLeftSide={false}
      isTurn={true}
      captures={[10, 4, 2, 1, 1, 2, 1]}
    />
  ).dive()

  expect(wrapper.childAt(0).children()).toHaveLength(1)
  expect(wrapper.childAt(1).children()).toHaveLength(2)
  expect(wrapper.childAt(2).children()).toHaveLength(1)
  expect(wrapper.childAt(3).children()).toHaveLength(1)
  expect(wrapper.childAt(4).children()).toHaveLength(2)
  expect(wrapper.childAt(5).children()).toHaveLength(4)
  expect(wrapper.childAt(6).children()).toHaveLength(10)

  const p0 = wrapper.childAt(0).childAt(0)
  const p1 = wrapper.childAt(1).childAt(1)
  const p2 = wrapper.childAt(2).childAt(0)
  const p3 = wrapper.childAt(3).childAt(0)
  const p4 = wrapper.childAt(4).childAt(0)
  const p5 = wrapper.childAt(5).childAt(3)
  const p6 = wrapper.childAt(6).childAt(8)

  const hisha = `Piece Piece-${Hisha0} Piece-Turn  Capture-${Hisha0}011`
  expect(p0.hasClass(hisha)).toBeTruthy()
  const kaku = `Piece Piece-${Kaku0} Piece-Turn  Capture-${Kaku0}022`
  expect(p1.hasClass(kaku)).toBeTruthy()
  const kin = `Piece Piece-${Kin0} Piece-Turn  Capture-${Kin0}011`
  expect(p2.hasClass(kin)).toBeTruthy()
  const gin = `Piece Piece-${Gin0} Piece-Turn  Capture-${Gin0}011`
  expect(p3.hasClass(gin)).toBeTruthy()
  const kei = `Piece Piece-${Kei0} Piece-Turn  Capture-${Kei0}021`
  expect(p4.hasClass(kei)).toBeTruthy()
  const kyou = `Piece Piece-${Kyou0} Piece-Turn  Capture-${Kyou0}044`
  expect(p5.hasClass(kyou)).toBeTruthy()
  const fu = `Piece Piece-${Fu0} Piece-Turn  Capture-${Fu0}0109`
  expect(p6.hasClass(fu)).toBeTruthy()
})

it('(LeftSide)持ち駒の枚数に応じて正しいクラス名が付く', async () => {
  const gs: GameStateStore = new GameStateStore()
  const wrapper = shallow(
    <Captures
      gs={gs}
      isLeftSide={true}
      isTurn={false}
      captures={[10, 4, 2, 1, 1, 2, 1]}
    />
  ).dive()

  expect(wrapper.childAt(0).children()).toHaveLength(1)
  expect(wrapper.childAt(1).children()).toHaveLength(2)
  expect(wrapper.childAt(2).children()).toHaveLength(1)
  expect(wrapper.childAt(3).children()).toHaveLength(1)
  expect(wrapper.childAt(4).children()).toHaveLength(2)
  expect(wrapper.childAt(5).children()).toHaveLength(4)
  expect(wrapper.childAt(6).children()).toHaveLength(10)

  const p0 = wrapper.childAt(0).childAt(0)
  const p1 = wrapper.childAt(1).childAt(1)
  const p2 = wrapper.childAt(2).childAt(0)
  const p3 = wrapper.childAt(3).childAt(0)
  const p4 = wrapper.childAt(4).childAt(0)
  const p5 = wrapper.childAt(5).childAt(3)
  const p6 = wrapper.childAt(6).childAt(8)

  const hisha = `Piece Piece-${Hisha1}   Capture-${Hisha0}111`
  expect(p0.hasClass(hisha)).toBeTruthy()
  const kaku = `Piece Piece-${Kaku1}   Capture-${Kaku0}122`
  expect(p1.hasClass(kaku)).toBeTruthy()
  const kin = `Piece Piece-${Kin1}   Capture-${Kin0}111`
  expect(p2.hasClass(kin)).toBeTruthy()
  const gin = `Piece Piece-${Gin1}   Capture-${Gin0}111`
  expect(p3.hasClass(gin)).toBeTruthy()
  const kei = `Piece Piece-${Kei1}   Capture-${Kei0}121`
  expect(p4.hasClass(kei)).toBeTruthy()
  const kyou = `Piece Piece-${Kyou1}   Capture-${Kyou0}144`
  expect(p5.hasClass(kyou)).toBeTruthy()
  const fu = `Piece Piece-${Fu1}   Capture-${Fu0}1109`
  expect(p6.hasClass(fu)).toBeTruthy()
})

it('持ち駒を選択できる', async () => {
  const gs: GameStateStore = new GameStateStore()
  const wrapper = shallow(
    <Captures
      gs={gs}
      isLeftSide={false}
      isTurn={true}
      captures={[10, 4, 2, 1, 1, 2, 1]}
    />
  ).dive()

  const p = wrapper.childAt(0).childAt(0)
  p.simulate('click')
  const className = `Piece Piece-${Hisha0} Piece-Turn Piece-Selected Capture-${Hisha0}011`
  const p2 = wrapper.childAt(0).childAt(0) // 再度取得する必要があった
  expect(p2.hasClass(className)).toBeTruthy()
})

it('手番ではない方の駒をクリックしても選択できない', async () => {
  const gs: GameStateStore = new GameStateStore()
  const wrapper = shallow(
    <Captures
      gs={gs}
      isLeftSide={false}
      isTurn={false}
      captures={[10, 4, 2, 1, 1, 2, 1]}
    />
  ).dive()

  const p = wrapper.childAt(0).childAt(0)
  p.simulate('click')
  const className = `Piece Piece-${Hisha0}   Capture-${Hisha0}011`
  const p2 = wrapper.childAt(0).childAt(0) // 再度取得する必要があった
  expect(p2.hasClass(className)).toBeTruthy()
})
