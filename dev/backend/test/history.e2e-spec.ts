import * as request from 'supertest';
import { app, authCookie } from './setup.e2e';

describe('Heroes (e2e)', () => {
  it('GET /', async () => {
    const response = await request(app.getHttpServer())
      .get('/heroes?limit=1&page=1')
      .set('Cookie', authCookie);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.total).toBeDefined();
  });
});
