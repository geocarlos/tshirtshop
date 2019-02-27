const express = require('express');
const router = new express.Router({});
/**
 * Routes for handling product-related query.
 * Departments and categories included
 */
/* --- Handlers --- */
const product = require('./product');

const rootUrl = '/api';

const urls = {
    getProducts: rootUrl + '/products',
    getSearchProduct: rootUrl + '/product/search',
    getDepartments: rootUrl + '/departments',
    getCategories: rootUrl + '/categories',
    getDepartment: rootUrl + '/department/:id([A-Z0-9]+)',
    getCategory: rootUrl + '/category/:id([A-Z0-9]+)',
    getProduct: rootUrl + '/product/:id([A-Z0-9]+)'
}

/* --- Routes --- */
router.get(urls.getProducts, product.handleGetProducts);
router.get(urls.getSearchProduct, product.handleGetSearchProduct);
router.get(urls.getProduct, product.handleGetProduct);
router.get(urls.getDepartments, product.handleGetDepartments)
router.get(urls.getDepartment, product.handleGetDepartment);
router.get(urls.getCategories, product.handleGetCategories)
router.get(urls.getCategory, product.handleGetCategory);

module.exports = router;