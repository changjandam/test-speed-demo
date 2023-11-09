# Comparing Jest and Vitest in Vite

## Demo

A simple React SPA which is created by Vite.

Using Zod and React Hook Form.

[code](https://github.com/changjandam/test-speed-demo)

## Dependencies

### same

- @testing-library/react
- @testing-library/jest-dom
- @testing-library/user-event

### Jest

- jest
- @types/jest
- ts-jest
- ts-node
- jest-environment-jsdom
- identity-obj-proxy

### Vitest

- vitest
- jsdom

## Config

### same

./src/utils/RTL/setup.ts

```ts
import '@testing-library/jest-dom';
```

### Jest

Jest needs a `jest.config.ts` file to config.

jest.config.ts

```ts
import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  //  Jest needs ts-jest to transform tsx to js
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    //  Jest can't handle static assets like images and CSS files, so we need to mock them.
  },
  setupFilesAfterEnv: ['./src/utils/RTL/setup.ts'],
};

export default jestConfig;
```

### Vitest

vite.config.ts

```ts
// next line is adding vitest config to vite
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/utils/RTL/setup.ts'],
  },
  //  Vitest shares all project config with Vite,
  //  so we don't have to config typescript, react or static assets again.
});
```

tsconfig.json

```json
{
  "compilerOptions": {
    "types": ["vitest/globals"] // add this line for global types
  }
}
```

## Test method

- platform: Mac mini (M1, 2020 16GB)
- OS: macOS Sonoma 14.1
- node: v18.16.0

I use shell script to run tests fifty times and get the total time.

Checkout [ts-jest](https://github.com/changjandam/test-speed-demo/tree/ts-jest) branch and [vitest](https://github.com/changjandam/test-speed-demo/tree/vitest) branch to get more detail.

## Conclusion

Jest tests took 301 seconds
Vitest tests took 176 seconds (-58%)

Obviously, Vitest is faster, less dependencies and easier to config.
Due to Vitest being based on Jest, it has almost the same API as Jest.

## Aspects Not Covered

1. There is an alternative way to set up Jest with Vite, detailed [here](https://github.com/sodatea/vite-jest/blob/main/packages/vite-jest/README.md#vite-jest), but it still requires more configuration effort.

2. This demo uses Vite with SWC, known for its speed. Vitest shares the configuration with Vite, which may be one reason for its faster performance compared to Jest. There is also a SWC plugin for Jest that could potentially offer speed improvements. Unfortunately, I was unable to configure it. If you have experience with this setup, please let me know.