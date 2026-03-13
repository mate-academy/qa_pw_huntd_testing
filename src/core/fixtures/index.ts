import { mergeTests } from '@playwright/test';
import { test as authTest } from '@src/core/fixtures/auth.fixture';
import { test as dataTest } from '@src/core/fixtures/test-data.fixture';

export const test = mergeTests(dataTest, authTest);
export const expect = test.expect;