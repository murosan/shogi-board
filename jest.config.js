'use strict';

module.exports = {
  setupFiles: ['raf/polyfill', './test/jest.setup.js'],
  transform: {
    '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  watchPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/coverage/',
    '<rootDir>/public/dist/',
  ],
  // unmockedModulePathPatterns: ['node_modules/react/', 'node_modules/enzyme/'],
};
