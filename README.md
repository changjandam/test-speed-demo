# Comparing Jest and Vitest in Vite

## TL;DR:

Vitest is faster, less dependencies and easier to config.

## Why Vite?

Comparing to Create React App, Vite is much faster. There are some articles talking about why you should use Vite.

- [Why we use Vite instead of Create React App](https://makimo.com/blog/why-we-use-vite-instead-of-create-react-app/)
- [4 Reasons Why You Should Prefer Vite Over Create-React-App (CRA)](https://semaphoreci.com/blog/vite)

## Demo

A simple React form using TypeScript, module CSS, React Hook Form and Zod.

[code](https://github.com/changjandam/test-speed-demo)

## Dependencies

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

### same

- @testing-library/react
- @testing-library/jest-dom
- @testing-library/user-event

## Config

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
// next line is adding Vitest config to Vite
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

### same

./src/utils/RTL/setup.ts

```ts
import '@testing-library/jest-dom';
```

## Test method

- device: Mac mini (M1, 2020 16GB)
- OS: macOS Sonoma 14.1
- node: v18.16.0

I use shell script to run tests fifty times and get the total time.

Checkout [ts-jest](https://github.com/changjandam/test-speed-demo/tree/ts-jest) branch and [vitest](https://github.com/changjandam/test-speed-demo/tree/vitest) branch to get more detail.

## Conclusion

Jest tests took 301 seconds
Vitest tests took 176 seconds (-58%)

Obviously, Vitest is faster, less dependencies and easier to config.
Due to Vitest being based on Jest, it has almost the same API as Jest. So it's easy to migrate from Jest to Vitest.

## Aspects Not Covered

1. There is an alternative way to set up Jest with Vite, detailed [here](https://github.com/sodatea/vite-jest/blob/main/packages/vite-jest/README.md#vite-jest), but it still requires more configuration effort.

2. This demo is using Vite with SWC, known for its speed. Vitest shares the configuration with Vite, which may be one reason for its faster performance compared to Jest. There is also a [SWC plugin](https://swc.rs/docs/usage/jest) for Jest that could potentially offer speed improvements. Unfortunately, I was unable to configure it. If you have experience with this setup, please let me know.

3. According to the [Vitest documentation](https://vitest.dev/guide/why.html), Vitest is using Worker threads to run tests in parallel. It might not show a significant difference in this demo, because the tests are relatively simple. However, it could be a big advantage for larger projects.
