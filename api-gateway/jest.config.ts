export default {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/__tests__/**/*.test.ts"],
    moduleFileExtensions: ["ts", "js"],
    transform: {
      "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.json" }],
    },
  };
  