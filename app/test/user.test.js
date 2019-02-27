/**
 * These are integration tests
 */
process.env.NODE_ENV = 'test';
process.env.PORT = 3002;

const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('User signs up', () => {
    const data = {
        email: 'test@email.com',
        password: '1234',
        name: 'Armando Pinto',
    }

    it('responds with code 302', done => {
        request(app)
            .post('/auth/sign-up')
            .send(data)
            .set('Accept', 'application/json')
            .expect(302)
            .end(done);
    });
})

describe('User signs in', () => {
    const data = {
        email: 'test@email.com',
        password: '1234'
    }

    it('responds with code 302', done => {
        request(app)
            .post('/auth/sign-in')
            .send(data)
            .set('Accept', 'application/json')
            .expect(302)
            .end(done);

    })
})