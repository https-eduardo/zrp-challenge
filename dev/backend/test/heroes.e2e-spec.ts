import * as request from 'supertest';
import { app, authCookie } from './setup.e2e';
import { getMockHero } from 'src/modules/heroes/__tests__/__mocks__/hero.mock';

describe('Heroes (e2e)', () => {
  let heroId: number;
  const mockHero = getMockHero();
  it('POST /', async () => {
    const response = await request(app.getHttpServer())
      .post('/heroes')
      .set('Cookie', authCookie)
      .send(mockHero);

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe(mockHero.name);
    heroId = response.body.id;
  });

  it('GET /:heroId', async () => {
    const response = await request(app.getHttpServer())
      .get(`/heroes/${heroId}`)
      .set('Cookie', authCookie);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(heroId);
    expect(response.body.name).toBe(mockHero.name);
  });

  it('GET /', async () => {
    const response = await request(app.getHttpServer())
      .get('/heroes?limit=1&page=1')
      .set('Cookie', authCookie);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].id).toBe(heroId);
  });

  it('PATCH /', async () => {
    mockHero.name = 'mockuserupdate';
    mockHero.latitude = 10.2684;
    const response = await request(app.getHttpServer())
      .patch(`/heroes/${heroId}`)
      .set('Cookie', authCookie)
      .send(mockHero);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(heroId);
    expect(response.body.name).toBe(mockHero.name);
  });

  it('DELETE /:heroId', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/heroes/${heroId}`)
      .set('Cookie', authCookie);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(heroId);
    expect(response.body.name).toBe(mockHero.name);
  });
});
