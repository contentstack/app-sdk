module.exports = {
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)",
    ],
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleNameMapper: {
      "^axios$": "axios/dist/node/axios.cjs"
    },
    collectCoverageFrom: ["./src/**"],
    coveragePathIgnorePatterns: ["<rootDir>.*types.ts"],
    coverageReporters: ["text", "html"],
};
