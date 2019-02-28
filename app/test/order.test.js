/**
 * These are integration tests
 */
process.env.NODE_ENV = 'test';
process.env.PORT = 3002;

const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('operations with orders', () => {

    const orderData = {
        total_amount: 0.0,
        comments: 'Please deliver in the morning',
    }

    const placeOrderData = {
        total_amount: 0.0,
        order_id: 1,
        product_id: 3,
        _attributes: 'color, size',
        product_name: 'Coat of Arms',
        quantity: 2,
        unit_cost: 14.50   
    }

    it('creates an order', done => {
        request(app)
        .post('/api/order')
        .send(orderData)
        .expect(200)
        .expect(res => {
            expect(res.body).to.have.property('order_id');
        })
        .end(done);
    })

    it('places an order', done => {
        request(app)
        .post('/api/order/place')
        .send(placeOrderData)
        .expect(200)
        .expect(res => {
            expect(res.body).to.have.property('item_id');            
        })
        .end(done)
    });

    it('gets an order with updated status and total_amount', done => {
        request(app)
            .get('/api/order/' + placeOrderData.order_id)
            .expect(200)
            .expect(res => {
                expect(res.body[0]).to.have.property('order');
                expect(res.body[0].order.status).to.equal(1);
                expect(Number(res.body[0].order.total_amount)).to.equal(29);
            })
            .end(done);
    })
})