import request from 'supertest';
import { Express } from 'express';
import createApp from '../../src/server';

let app: Express;
const getIndustries = jest.fn(() => {
  return {
    success: true,
    data: []
  }
});
const addIndustry = jest.fn();

app = createApp({
  getIndustries,
  addIndustry
})

describe('GET/industries', () => {
  test('getIndustries only called once', async () => {
    await request(app).get('/api/v1/industries');
    expect(getIndustries.mock.calls.length).toBe(1);
  })
})
