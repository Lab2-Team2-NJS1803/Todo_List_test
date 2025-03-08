# React Vite Todo List with Jest & React Testing Library

## Project Setup & Installation

Follow these steps to set up and install the project:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-repo/todo-app.git
   cd todo-app
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Start the development server**:
   ```sh
   npm run dev
   ```

---

## Testing Setup & Execution

### 1. Install Jest and TypeScript Types

Install Jest and its TypeScript types:
```sh
npm install --save-dev jest @types/jest
```

### 2. Add Test Script

Modify `package.json` to include test scripts:
```json
"scripts": {
  "test": "jest",
  "test:cov": "jest --coverage --watchAll"
}
```

### 3. Install React Testing Library

Install React Testing Library and related dependencies:
```sh
npm install --save-dev @testing-library/react
npm install --save-dev @testing-library/jest-dom
npm install --save-dev @testing-library/user-event
```

### 4. Install Babel and Other Dependencies

```sh
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-jest identity-obj-proxy jest-environment-jsdom
```

### 5. Configure Jest in `package.json`

```json
"jest": {
  "testEnvironment": "jsdom",
  "setupFilesAfterEnv": [
    "<rootDir>/setup-test.ts"
  ],
  "moduleNameMapper": {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/mocks/fileMock.js"
  },
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.{spec,test}.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/dist/**",
    "!**/build/**",
    "!vite.config.ts",
    "!**/coverage/**"
  ],
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "setup-tests.ts",
    "vite-env.d.ts"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  }
}
```

### 6. Create Setup File

Create `setup-test.ts` in the root of the project:
```ts
import '@testing-library/jest-dom';
```

### 7. Create Babel Configuration

Create `babel.config.cjs`:
```js
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { esmodules: true } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ]
};
```

### 8. Create Mocks for Static Assets

Inside `src/mocks`, create `fileMock.js`:
```js
module.exports = 'test-file-stub';
```

### 9. Update `.gitignore`

Add coverage reports to `.gitignore`:
```sh
coverage
```

### 10. Install `ts-jest` and `ts-node`
```sh
npm install --save-dev ts-jest ts-node
```

### Running Tests
To run tests, use:
```sh
npm run test
```
To run tests with coverage:
```sh
npm run test:cov
```

---

## Test Coverage Explanation

Jest provides test coverage analysis to help ensure the quality of your code. Running `npm run test:cov` generates a coverage report showing:

- **Statements**: How many statements in the code have been executed.
- **Branches**: The percentage of control structures (if/else, loops) covered.
- **Functions**: How many functions are tested.
- **Lines**: The percentage of lines covered by tests.

Coverage reports are output to the `coverage/` directory and can be viewed as an HTML report.

---

## Best Practices for Testing

- **Write unit tests for all components**: Test different UI states and interactions.
- **Use `data-testid` for selecting elements**: Ensures stable test selectors.
- **Mock external dependencies**: Prevents network calls and complex setup.
- **Test both happy and edge cases**: Cover various input conditions.
- **Use snapshots for static components**: Helps detect unexpected changes.

By following these steps, you ensure robust testing and maintainability of your Todo List application.
