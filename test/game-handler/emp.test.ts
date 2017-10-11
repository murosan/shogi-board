import EmpObj from '../../src/game-handler/emp';

test('空ますのインスタンスを作成し、更新できる', () => {
  expect(new EmpObj().update()).toBeInstanceOf(EmpObj);
});
