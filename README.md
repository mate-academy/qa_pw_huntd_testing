# Task Description

To see the description of the task assignment [follow the link](https://github.com/mate-academy/qa_pw_huntd_testing/blob/main/TaskDescription.md).

# Repository Overview

This repository contains a Playwright + TypeScript automation framework for the [Huntd](https://huntd.tech/) application.

The framework uses:
- base pages and base components
- components and composition
- builders for dynamic test data
- facades for login and registration flows
- nested parentSuite / suite / subSuite test hierarchy
- Docker and GitHub Actions support

# How to use this project

## Installation steps

1. Install Node.js.
2. Install project dependencies.

```bash
npm ci
```

3. Install Playwright browsers.

```bash
npx playwright install
```

4. Install Allure commandline tool if you want Allure reports.

```bash
npm install -g allure-commandline
```

5. Create a `.env` file based on `.env.example`.

For authenticated scenarios set valid Huntd credentials:

```bash
BASE_URL=https://huntd.tech
AUTH_EMAIL=your_test_email
AUTH_PASSWORD=your_test_password
HEADLESS=true
```

## How to run the tests

Run the full suite:

```bash
npm test
```

Run only smoke tests:

```bash
npm run test:smoke
```

Run only public regression tests:

```bash
npm run test:regression -- tests/regression/public
```

Run only authenticated regression tests:

```bash
npm run test:auth
```

Run role-based sign-up E2E tests:

```bash
npm run test:e2e
```

Run tests in headed mode:

```bash
npm run test:headed
```

## How to generate report

Open the Playwright HTML report after execution:

```bash
npm run report
```

Generate and open the Allure report:

```bash
allure generate ./allure-results --clean -o ./allure-report
allure open ./allure-report
```