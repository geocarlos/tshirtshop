/**
 * These are integration tests
 */
process.env.NODE_ENV = 'test';
process.env.PORT = 3002;

const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('Shopping cart operations', () => {

    shoppingCartData = {
            product_id: 3,
            _attributes: 'color, size',
            quantity: 3,
            buy_now: 1
    }

    it('adds an item to shopping cart with no cookie set', (done) => {
        request(app)
        .post('/api/shopping-cart/add-to-cart')
        .send(shoppingCartData)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('item_id');
            expect(res.body).to.have.property('cart_id');
        })
        .end(done);
    })

    it('adds an item to shopping cart with cookie set', (done) => {
        request(app)
        .post('/api/shopping-cart/add-to-cart')
        .set('Cookie', ['cart_id=5229240527fbd17eb6d610af83063db4'])
        .send(shoppingCartData)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('item_id');
            expect(res.body).to.have.property('cart_id');
        })
        .end(done);
    })

    it('gets a list of shopping cart records', (done) => {
        request(app)
        .get('/api/shopping-cart')
        .set('Cookie', ['cart_id=5229240527fbd17eb6d610af83063db4'])
        .send(shoppingCartData)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
            expect(res.body).to.be.an('array');
            expect(res.body.length > 0).to.equal(true);
        })
        .end(done);
    })
})