module.exports = {
  roots: [
    '<rootDir>/src'
  ],
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  coverageProvider: 'v8'
}
