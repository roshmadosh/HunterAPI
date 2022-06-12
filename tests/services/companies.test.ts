import request from 'supertest';
import { Express } from 'express';
import createApp from '../../src/server';
import { ICompany } from '../../src/models/company'

let app: Express;

const addCompany = jest.fn((requestBody: ICompany) => {
  return {
    success: true,
    apiCalled: true,
    data: ['success']
  }
})

app = createApp({
  addCompany
});

describe('POST/companies', () => {
  test('DB not queried when invalid company_name over 30 char limit', async () => {
    const response = await request(app)
      .post('/api/v1/companies')
      .send({
        industry_name: 'non null',
        company_name: '1234567890123456789012345678901',
      });

    expect(response.body.success).toBe(false);
    expect(response.body.apiCalled).toBe(false);
    expect(response.body.message).toEqual(expect.stringMatching(/0 and 30/));
    expect(addCompany.mock.calls.length).toBe(0);
  })

  test('DB not queried when empty company_name', async () => {
    const response = await request(app)
      .post('/api/v1/companies')
      .send({
        industry_name: 'non null',
        company_name: ''
      });

    expect(response.body.success).toBe(false);
    expect(response.body.apiCalled).toBe(false);
    expect(response.body.message).toEqual(expect.stringMatching(/0 and 30/));
    expect(addCompany.mock.calls.length).toBe(0);  
  })

  test('DB queried and mock response returned on valid request', async () => {
    const response = await request(app)
    .post('/api/v1/companies')
    .send({
      industry_name: 'non null',
      company_name: 'no null and valid'
    });

  expect(response.body.success).toBe(true);
  expect(response.body.apiCalled).toBe(true);
  expect(response.body.data).toStrictEqual(['success']);
  expect(addCompany.mock.calls.length).toBe(1);  
  })
})
