const CategoryModel = require('../models/category.model');

class Category {
    static getAll = () => {
        return CategoryModel.find();
    }

    static getById = id => {
        return CategoryModel.findOne({_id: id});
    }

    static add = (name) => {
        const category = new CategoryModel({
            name: name
        })

        return category.save();
    }

    static delete = id => {
        return CategoryModel.deleteOne({_id: id});
    }
}

module.exports = Category;