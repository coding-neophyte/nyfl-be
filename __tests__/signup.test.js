const pool = require('../lib/utils/pool')
const setup = require('../data/setup')
const request = require('supertest');
const app = require('../lib/app')


describe('testing signup', () => {
    beforeEach(() => {
        return setup(pool);
    })
    afterAll(() => {
        return pool.end;
    })

    it('should signup a new user', async () => {
        const newUser = {
            name: 'mock user',
            email: 'mockuser@mail.com'
        }

        const response = await request(app).post('/api/v1/users').send(newUser);

        expect(response.body).toEqual({ ...newUser, id: expect.any(String) });
    })
})
