const express = require('express');
const router = new express.Router({});
const Product = require('../../models/product');

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


/* --- Handlers --- */
const handleGetProducts = async (req, res)=> {
    try{
        const products = await Product.findAll();
        return res.json(products);
    } catch(error){
        console.error(error.message);
        return res.json({error: error})
    }
};

const handleGetSearchProduct = (req, res) => {
    return res.json({"search": req.query.search});
};

const handleGetProduct = (req, res)=> {
    return res.json({productId:  req.params.id})
};

const handleGetDepartments = (req, res) =>{
    return res.json({message: "This will list all departments"});
};

const handleGetDepartment = (req, res) =>{
    return res.json({department: req.params.id});
};

const handleGetCategories = (req, res) =>{
    return res.json({message: "This will list all categories"});
};

const handleGetCategory = (req, res) =>{
    return res.json({category: req.params.id});
};

/* --- Routes --- */
router.get(urls.getProducts, handleGetProducts);
router.get(urls.getSearchProduct, handleGetSearchProduct);
router.get(urls.getProduct, handleGetProduct);
router.get(urls.getDepartments, handleGetDepartments)
router.get(urls.getDepartment, handleGetDepartment);
router.get(urls.getCategories, handleGetCategories)
router.get(urls.getCategory, handleGetCategory);

module.exports = router;