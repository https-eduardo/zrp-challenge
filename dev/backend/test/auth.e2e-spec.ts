import { app, createdUser } from './setup.e2e';
import * as request from 'supertest';

describe('Auth (e2e)', () => {
  let cookie: string[];

  it('POST /', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth')
      .send({ email: createdUser.email, password: createdUser.password });

    const responseCookie = response.get('Set-Cookie');
    expect(response.status).toBe(200);
    expect(responseCookie).toBeDefined();
    cookie = responseCookie;
  });

  it('POST /logout', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/logout')
      .set('Cookie', cookie)
      .send({ email: createdUser.email, password: createdUser.password });

    const responseCookie = response.get('Set-Cookie');
    expect(response.status).toBe(200);
    expect(responseCookie).toBeDefined();
    expect(responseCookie[0]).toMatch('accessToken=;');
  });
});
