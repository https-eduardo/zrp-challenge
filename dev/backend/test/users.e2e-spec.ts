import { getMockUser } from 'src/modules/users/__tests__/__mocks__/user.mock';
import { app } from './setup.e2e';
import * as request from 'supertest';

describe('Users (e2e)', () => {
  it('POST /', async () => {
    const user = getMockUser();

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(user);

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.email).toBe(user.email);
  });
});
