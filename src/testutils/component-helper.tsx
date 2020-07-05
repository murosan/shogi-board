import {
  mount as emount,
  ReactWrapper,
  shallow as eshallow,
  ShallowRendererProps,
  ShallowWrapper,
} from 'enzyme'
import React, { ReactElement } from 'react'
import { Store } from '../model/store/Store'
import { DefaultStore } from '../store/Store'

export function shallow<T, U>(
  element: () => ReactElement<T>,
  store?: Store,
  options?: ShallowRendererProps
): ShallowWrapper<T, U> {
  return render((e, o) => eshallow(e, o), { element, store, options })
}

export function mount<T, U>(
  element: () => ReactElement<T>,
  store?: Store,
  options?: ShallowRendererProps
): ReactWrapper<T, U> {
  return render((e, o) => emount(e, o), { element, store, options })
}

export interface RenderProps<T> {
  element: () => ReactElement<T>
  store?: Store
  options?: ShallowRendererProps
}

function defaultStore(): Store {
  return new DefaultStore()
}

function render<T, U>(
  f: (element: ReactElement<T>, options?: ShallowRendererProps) => U,
  { element, store, options }: RenderProps<T>
): U {
  jest
    .spyOn(React, 'useContext')
    .mockImplementation(() => store || defaultStore())
  return f(element(), options)
}
