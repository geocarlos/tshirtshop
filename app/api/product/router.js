const express = require('express');
const router = new express.Router({});
const { memcached } = require('../../middleware/middleware');
/**
 * Routes for handling product-related query.
 * Departments and categories included
 */

const product = require('./product');

const rootUrl = '/api';

const urls = {
    getProducts: rootUrl + '/products',
    getSearchProduct: rootUrl + '/product/search',
    getDepartments: rootUrl + '/departments',
    getCategories: rootUrl + '/categories',
    getDepartment: rootUrl + '/department/:id([A-Z0-9]+)',
    getCategory: rootUrl + '/category/:id([A-Z0-9]+)',
    getProduct: rootUrl + '/product/:id([A-Z0-9]+)',
    getProductsByCategory: rootUrl + '/products/category/:id([A-Z0-9]+)',
    getCategoriesByDepartment: rootUrl + '/categories/department/:id([A-Z0-9]+)'
}

/* --- Routes --- */
router.get(urls.getProducts, async (req, res) => {
    try {
        const products = await product.getProducts();
        return res.json(products);
    }
    catch (error) {
        return res.status(error.status || 401).json(error);
    }
});
router.get(urls.getSearchProduct, async (req, res) => {
    try {
        const products = await product.getSearchProduct(req.query.q);
        return res.json(products);
    } catch (error) {
        return res.status(error.status || 401).json(error);
    }
});
router.get(urls.getProduct, memcached(20), async (req, res) => {
    try {
        const item = await product.getProduct(req.params.id);
        return res.json(item);
    } catch (error){
        return res.status(error.status || 401).json({error});
    }
});

/**
 * GET a list of all departments
 */
router.get(urls.getDepartments, async (req, res) => {
    try {
        const departments = await product.getDepartments();
        return res.json(departments);
    } catch (error) {
        return json({message: error});
    }
});

/**
 * GET a department by ID
 */
router.get(urls.getDepartment, async (req, res) => {
    try {
        const department = await product.getDepartment(req.params.id);
        return res.json(department);
    } catch (error) {
        return res.json(error);
    }
});

/**
 * GET a list of all categories with their respective departments
 */
router.get(urls.getCategories, async (req, res) => {
    try {
        const categories = await product.getCategories();
        return res.json(categories);
    } catch (error) {
        return res.json(error);
    }
})

/**
 * GET a category by ID
 */
router.get(urls.getCategory, async (req, res) => {
    try {
        const category = await product.getCategory(req.params.id);
        return res.json(category)
    } catch (error) {
        return res.json(error);
    }
});

/**
 * GET a list of products based on a Category
 */
router.get(urls.getProductsByCategory, async (req, res) => {
    try {
        const products = await product.getProductsByCategory(req.params.id);
        return res.json(products);
    } catch (error) {
        return res.json(error);
    }
})

/**
 * GET categories in the department matching the provided id
 */
router.get(urls.getCategoriesByDepartment, async (req, res) => {
    try {
        const categories = await product.getCategoriesByDepartment(req.params.id);
        return res.json(categories);
    } catch (error) {
        return res.json({ message: error });
    }
})

module.exports = router;