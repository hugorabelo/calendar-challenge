module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  // collectCoverage: true,
  // collectCoverageFrom: ['<rootDir>/src/components/**/*.vue', '<rootDir>/src/views/**/*.vue'],
}
