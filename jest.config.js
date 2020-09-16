const rawConfig = require("./tsconfig.json")
// extends 를 지원하지 않아서 임시로 처리함
const tsconfigBase = require(rawConfig['extends']);
const tsconfig = Object.assign(rawConfig,tsconfigBase);

const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig)


module.exports = {
    transform: {'^.+\\.ts?$': 'ts-jest'},
    testEnvironment: 'node',
    testRegex: '/tests/jest/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    cacheDirectory: ".jest/cache",
    maxWorkers: 1,
    collectCoverageFrom: [
      '<rootDir>/src/app/**',
   ],
   moduleNameMapper
};