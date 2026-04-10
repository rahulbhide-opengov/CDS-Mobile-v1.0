/** @type {import('jest').Config} */
module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
    }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@opengov|@tamagui|react-native-svg)/)',
  ],
  setupFilesAfterSetup: ['@testing-library/jest-native/extend-expect'],
  moduleNameMapper: {
    '^@opengov/cds-tokens$': '<rootDir>/../../packages/tokens/src',
    '^@opengov/cds-themes$': '<rootDir>/../../packages/themes/src',
    '^@opengov/cds-config$': '<rootDir>/../../packages/config/src',
    '^@opengov/cds-primitives$': '<rootDir>/../../packages/primitives/src',
    '^@opengov/cds-icons$': '<rootDir>/../../packages/icons/src',
    '^@opengov/cds-components$': '<rootDir>/../../packages/components/src',
    '^@opengov/cds-patterns$': '<rootDir>/../../packages/patterns/src',
  },
}
