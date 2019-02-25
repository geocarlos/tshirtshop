const express = require('express');
const router = new express.Router({});
const Product = require('../../models/product');
const Department = require('../../models/department');
const Category = require('../../models/category');
const { Op } = require('sequelize');

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

Category.hasOne(Department, {foreignKey: 'department_id'});

/* --- Handlers --- */
const handleGetProducts = async (req, res)=> {
    try{
        const products = await Product.findAll();
        return res.json(products);
    } catch(error){
        return res.json({error})
    }
};

const handleGetSearchProduct = async (req, res) => {
    try{
        const products = await Product.findAll({
            where: {
                [Op.or]: {
                    name: {
                        [Op.like]: '%' + req.query.q + '%'
                    },
                    description: {
                        [Op.like]: '%' + req.query.q + '%'
                    }
                }
            }
        });
        return res.json(products);
    } catch(error){
        return res.json({error});
    }
};

const handleGetProduct = async (req, res)=> {
    try {
        const product = await Product.findOne({
            where: {
                product_id: req.params.id
            }
        })
        return res.json(product)
    } catch(error){
        return res.json({error});
    }
};

const handleGetDepartments = async (req, res) =>{
    try{
        const departments = await Department.findAll();
        return res.json(departments);
    } catch(error){
        return res.json({error})
    }
};

const handleGetDepartment = async (req, res) =>{
    try {
        const department = await Department.findOne({
            where: {
                department_id: req.params.id
            }
        })
        return res.json(department)
    } catch(error){
        return res.json({error});
    }
};

const handleGetCategories = async (req, res) =>{
    try{
        const categories = await Category.findAll();
        return res.json(categories);
    } catch(error){
        return res.json({error})
    }
};

const handleGetCategory = async (req, res) =>{
    try {
        const category = await Category.findOne({
            where: {
                department_id: req.params.id
            }
        })
        return res.json(category)
    } catch(error){
        return res.json({error});
    }
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