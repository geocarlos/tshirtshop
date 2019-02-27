const Product = require('../../models/product');
const Department = require('../../models/department');
const Category = require('../../models/category');
const Attribute = require('../../models/attribute');
const AttributeValue = require('../../models/attribute-value');
const { ProductCategory, ProductAttribute } = require('../../models/join-models');
const { Op } = require('sequelize');

/* Model associations */
Category.belongsTo(Department, { foreignKey: 'department_id' });
Category.belongsToMany(Product, { through: ProductCategory, foreignKey: 'category_id' });
Product.belongsToMany(Category, { through: ProductCategory, foreignKey: 'product_id' })
AttributeValue.belongsTo(Attribute, { foreignKey: 'attribute_id' });
AttributeValue.belongsToMany(Product, { through: ProductAttribute });

/**
 * GET a list of all products
 * @param {Object} req 
 * @param {Object} res 
 */
const handleGetProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        return res.json(products);
    } catch (error) {
        return res.json({ error })
    }
};

/**
 * GET a product matching the query term in 'q'
 * @param {Object} req 
 * @param {Object} res 
 */
const handleGetSearchProduct = async (req, res) => {
    try {
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
    } catch (error) {
        return res.json({ error });
    }
};

/**
 * GET a product matching the provided ID
 * @param {Object} req 
 * @param {Object} res 
 */
const handleGetProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                product_id: req.params.id
            }
        })
        if (!product) {
            return res.status(404).json({ message: "No product found with id " + req.params.id })
        }
        return res.json(product)
    } catch (error) {
        return res.json({ error });
    }
};

/**
 * GET all departments
 * @param {Object} req 
 * @param {Object} res 
 */
const handleGetDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll();
        return res.json(departments);
    } catch (error) {
        return res.json({ error })
    }
};

/**
 * GET all departments
 * @param {Object} req 
 * @param {Object} res 
 */
const handleGetDepartment = async (req, res) => {
    try {
        const department = await Department.findOne({
            where: {
                department_id: req.params.id
            }
        });
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        return res.json(department)
    } catch (error) {
        return res.json({ error });
    }
};

/**
 * GET a list of all categories with related departments
 * @param {Object} req 
 * @param {Object} res 
 */
const handleGetCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: [
                {
                    model: Department,
                    attributes: ['department_id', 'name']
                }
            ]
        });
        return res.json(categories);
    } catch (error) {
        return res.json({ error })
    }
};

/**
 * GET a category by ID
 * @param {Object} req 
 * @param {Object} res 
 */
const handleGetCategory = async (req, res) => {
    try {
        const category = await Category.findOne({
            where: {
                category_id: req.params.id
            }
        })
        if (!category) {
            return res.status(404).json({ message: 'Category not found.' })
        }
        return res.json(category)
    } catch (error) {
        return res.json({ error });
    }
};

/**
 * Get a product based on a category matching provided id
 * @param {Object} req 
 * @param {Object} res 
 */
const handleGetProductsByCategory = async (req, res) => {
    try{
        const category = await Category.findOne({
            where: {
                category_id: req.params.id
            }
        });
        if(!category){
            return res.status(404).json({message: 'Category not found.'})
        }
        const products = await category.getProducts();
        return res.json(products);
    } catch(error){
        return res.json({message: error})
    }
}

module.exports = {
    handleGetProducts,
    handleGetSearchProduct,
    handleGetProduct,
    handleGetDepartments,
    handleGetDepartment,
    handleGetCategories,
    handleGetCategory,
    handleGetProductsByCategory
}