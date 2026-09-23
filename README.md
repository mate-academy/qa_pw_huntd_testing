# Task Description

To see the description of the task assignment [follow the link](https://github.com/mate-academy/qa_pw_huntd_testing/blob/main/TaskDescription.md).

# Repository Overview

This repository contains a test automation framework for the [Huntd](https://huntd.tech/) application testing.

# How to use this project

## Installation steps

To install the project follow the next steps:

1. Install Node.js.
2. Run the installation command in the project root.:

```bash
npm ci
```

3. Run the browsers installation in the project root.

```bash
npx playwright install
```

4. Install Allure commandline tool (Allure requires Java 8 or higher).

```bash
npm install -g allure-commandline
```

## How to run the tests

Run all tests (Chromium, Firefox, WebKit):

```bash
npx playwright test
```

Run a specific spec file:

```bash
npx playwright test tests/candidate-onboarding/authentication/signUp.spec.js
```

Run tests inside Docker:

```bash
docker build -t huntd-tests .
docker run --rm huntd-tests
```

## How to generate report

Playwright HTML report (generated automatically after a run):

```bash
npx playwright show-report
```

Allure report:

```bash
allure generate allure-results --clean -o allure-report
allure open allure-report
```

## Known Issues & Not Yet Covered

Found during manual exploration, not yet automated:

- **Bug:** on the Role step, the individual "×" on a selected "Desired roles" tag does not remove that tag (only the "clear all" control works). Works correctly for "Core technical skills" tags.
- **Bug:** on the Experience step, the "Role" input does not respond to hover/click — it's visually covered by the "Company name" field's tooltip.
- **Anomaly:** on the Expectations step, form validation appears staggered — the "Location is required" error only shows after Salary/Job experience/English level errors are already resolved.
- **Anomaly (not reliably reproducible):** selecting a city on the Expectations step occasionally reset "Employment options" back to "Remote" even after manually selecting "Office".

Not yet covered by automated tests (documented during analysis, out of scope for this submission due to the deadline):

- Sign In flow
- Profile Wizard steps: Expectations, Experience, Bio, Contact Information / Activation
- Recruiter registration flow (`/profile/recruiter`)
