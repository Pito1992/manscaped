module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  modulePathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
  moduleNameMapper: {
    '^.+\\.(png|jpg)$': '<rootDir>/mocks/fileTransform.js',
    '^.+\\.svg$': '<rootDir>/mocks/svgTransform.js',
    '^constants/(.*)$': '<rootDir>/constants/$1',
    '^components/(.*)$': '<rootDir>/components/$1',
    '^hooks/(.*)$': '<rootDir>/hooks/$1',
    '^contexts/(.*)$': '<rootDir>/contexts/$1',
    '^fixtures/(.*)$': '<rootDir>/fixtures/$1',
    '^assets/(.*)$': '<rootDir>/assets/$1',
  },
  testEnvironmentOptions: {
    url: 'https://manscaped.com',
  }
}