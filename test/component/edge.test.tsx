import * as React from 'react';
import { shallow } from 'enzyme';
import { Corner, EdgeHor, EdgeVer, EdgeProps } from '../../src/components/edge';

describe('Corner', async () => {
  test('作成できる', async () => {
    expect(shallow(<Corner />)).toBeDefined();
  });
});

describe('EdgeHor', async () => {
  test('作成できる', async () => {
    expect(shallow(<EdgeHor row={5} col={5} />)).toBeDefined();
  });

  test('列(筋)(col)を表示できる', async () => {
    const elm = shallow(<EdgeHor row={-1} col={4} />);
    expect(elm.find('.edge-text').text()).toBe('５');
  });
});

describe('EdgeVer', async () => {
  test('作成できる', async () => {
    expect(shallow(<EdgeHor row={5} col={5} />)).toBeDefined();
  });

  test('行(段)(row)を表示できる', async () => {
    const elm = shallow(<EdgeVer row={5} col={9} />);
    expect(elm.find('.edge-text').text()).toBe('六');
  });
});
