/**
 * These are integration tests
 */
process.env.NODE_ENV = 'test';
process.env.PORT = 3002;

const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');
const User = require('../models/customer');

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
    const credentials = {
        email: 'test@email.com',
        password: '1234'
    }

    it('responds with code 302', done => {
        request(app)
            .post('/auth/sign-in')
            .send(credentials)
            .set('Accept', 'application/json')
            .expect(302)
            .end(done);
    })
})

describe('User update details', () => {

    const data = {
        customer_id: 1,
        city: 'Rio de Janeiro',
    }

    const credentials = {
        email: 'test@email.com',
        password: '1234'
    }

    it('does not update because is user is not logged in', done => {
        request(app)
            .post('/api/user/update')
            .send(data)
            .set('Accept', 'application/json')
            .expect(401, done)
    })

    const agent = request.agent(app);

    it('logs in and creates a session', done => {
        agent
            .post('/auth/sign-in')
            .send(credentials)
            .set('Accept', 'application/json')
            .expect(302)
            .end(done);
    })


    it('updates details when user is logged in', done => {
        agent
            .post('/api/user/update')
            .send(data)
            .set('Accept', 'application/json')
            .expect(200)
            .end(done);
    });
})