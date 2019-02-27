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
 */
const getProducts = async () => {
    try {
        const products = await Product.findAll();
        return products;
    } catch (error) {
        throw error;
    }
};

/**
 * GET a product matching the query term
 * @param {String} queryTerm
 */
const getSearchProduct = async (queryTerm) => {
    try {
        const products = await Product.findAll({
            where: {
                [Op.or]: {
                    name: {
                        [Op.like]: '%' + queryTerm + '%'
                    },
                    description: {
                        [Op.like]: '%' + queryTerm + '%'
                    }
                }
            }
        });
        return products;
    } catch (error) {
        throw error;
    }
};

/**
 * GET a product matching the provided ID
 * @param {String} product_id
 */
const getProduct = async (product_id) => {
    try {
        const product = await Product.findOne({
            where: {
                product_id
            }
        })
        if (!product) {
            throw { status: 404, message: "No product found with id " + product_id};
        }
        return product;
    } catch (error) {
        throw error;
    }
};

/**
 * GET all departments
 */
const getDepartments = async () => {
    try {
        const departments = await Department.findAll();
        return departments;
    } catch (error) {
        throw error;
    }
};

/**
 * GET all departments
 * @param {String} department_id
 */
const getDepartment = async (department_id) => {
    try {
        const department = await Department.findOne({
            where: {
                department_id
            }
        });
        if (!department) {
            throw { status: 404, message: 'Department not found' };
        }
        return department;
    } catch (error) {
        throw error;
    }
};

/**
 * GET a list of all categories with related departments
 */
const getCategories = async () => {
    try {
        const categories = await Category.findAll({
            include: [
                {
                    model: Department,
                    attributes: ['department_id', 'name']
                }
            ]
        });
        return categories;
    } catch (error) {
        throw error;
    }
};

const getCategoriesByDepartment = async (department_id) => {
    try {
        const department = await Department.findOne({
            where: {
                department_id
            }
        })
        if(!department){
            throw { status: 404, message: 'Department not found'};
        }
        const categories = Category.findAll({
            where: {
                department_id
            }
        });
        return categories;
    } catch(error){
        throw error;
    }
}

/**
 * GET a category by ID
 * @param {String} category_id
 */
const getCategory = async (category_id) => {
    try {
        const category = await Category.findOne({
            where: {
                category_id
            }
        })
        if (!category) {
            throw { status: 404, message: 'Category not found.' }
        }
        return category;
    } catch (error) {
        throw error;
    }
};

/**
 * Get a product based on a category matching provided id
 * @param {String} category_id
 */
const getProductsByCategory = async (category_id) => {
    try{
        const category = await Category.findOne({
            where: {
                category_id
            }
        });
        if(!category){
            throw {status: 404, message: 'Category not found.'};
        }
        const products = await category.getProducts();
        return products;
    } catch(error){
        throw error;
    }
}

module.exports = {
    getProducts,
    getSearchProduct,
    getProduct,
    getDepartments,
    getDepartment,
    getCategories,
    getCategory,
    getProductsByCategory,
    getCategoriesByDepartment
}