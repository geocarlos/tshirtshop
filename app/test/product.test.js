/**
 * These are integration tests
 */
process.env.NODE_ENV = 'test';
process.env.PORT = 3002;

const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe("Get list of products", ()=>{
    
    it("gets a JSON response", done => {
        request(app)
        .get("/api/products")
        .expect(200)
        .expect('Content-Type', /json/, done)
    });

    it("gets an array whose length > 0", done => {
        request(app)
        .get("/api/products")
        .expect(200)
        .expect((res) => {
            expect(res.body).to.be.an('array');
            expect(res.body.length > 0).to.equal(true);
        })
        .end(done);
    });
});

describe("Get a product by its ID", ()=>{
    
    it("gets a product that contains a 'name' property", done => {
        request(app)
        .get('/api/product/1')
        .expect(200)
        .expect(res => {
            expect(res.body).to.have.property('name')
        })
        .end(done)
    });

    it("gets a 404 (not found) status", done => {
        request(app)
        .get('/api/product/noid')
        .expect(404)
        .expect(/No product found/, done)
    })
})

describe("Get product(s) by search term", ()=>{
    
    it("gets an array of product for the term searched", done => {
        request(app)
        .get('/api/product/search/?q=summer')
        .expect(200)
        .expect(res => {
            expect(res.body).to.be.an('array');
            expect(res.body[0]).to.have.property('description');
            expect(res.body[0].description).to.include('summer');
        })
        .end(done)
    });
})