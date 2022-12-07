/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '.test.ts': ['ts-jest', { useESM: true }],
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
