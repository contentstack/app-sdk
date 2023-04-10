module.exports = {
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)",
    ],
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    collectCoverageFrom: ["./src/**"],
    coveragePathIgnorePatterns: ["<rootDir>.*types.ts"],
    coverageReporters: ["text", "html"],
};
