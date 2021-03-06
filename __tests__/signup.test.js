const pool = require('../lib/utils/pool')
const setup = require('../data/setup')
const request = require('supertest');
const app = require('../lib/app')
const User = require('../lib/models/User');


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
    });

    it('should get entire email list', async () => {
        const mockUser = {
            name: 'mock user',
            email: 'mockuser@mail.com'
        }
        const user = await request(app).post('/api/v1/users').send(mockUser);

        const res = await request(app).get('/api/v1/users/list')

        expect(res.body).toEqual(expect.arrayContaining([ {...mockUser, id: expect.any(String) }]));
    })

    it('should delete a user', async () => {
        const mockUser = await User.Signup({
            name: 'mock user',
            email: 'mockuser@mail.com'
        });

        // const user = await request(app).post('/api/v1/users').send(mockUser);

        const res = await request(app).delete(`/api/v1/users/${mockUser.id}`)

        expect(res.body).toEqual({
            id: expect.any(String),
            name: 'mock user',
            email: 'mockuser@mail.com',
        })
    })


})
