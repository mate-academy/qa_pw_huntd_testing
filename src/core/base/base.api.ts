import { APIRequestContext, expect } from '@playwright/test';

export abstract class BaseApi {
  protected constructor(protected readonly request: APIRequestContext) {}

  protected async postGraphQL<T>(query: string, variables?: Record<string, unknown>) {
    const response = await this.request.post('/graphql', {
      data: { query, variables },
      failOnStatusCode: false,
    });

    expect(response.ok(), `GraphQL request failed with status ${response.status()}`).toBeTruthy();

    return (await response.json()) as T;
  }
}
