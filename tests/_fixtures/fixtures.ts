import { mergeTests } from '@playwright/test';
import { test as authTest } from './ui/fixturesAuth';
import { test as genericTest } from './fixturesGeneric';
import { test as homeTest } from './ui/fixturesHome';
import { test as profileTest } from './ui/fixturesProfile';
import { test as factoryTest } from './fixturesFactories';
import { test as usersApiTest } from './api/fixturesUsersApi';
import { test as profilesApiTest } from './api/fixturesProfilesApi';
import { test as pagesTest } from './ui/fixturesPages';

export const test = mergeTests(
  authTest,
  genericTest,
  homeTest,
  profileTest,
  factoryTest,
  usersApiTest,
  profilesApiTest,
  pagesTest,
);
