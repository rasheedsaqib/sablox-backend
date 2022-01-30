const PostModal = require('../models/post.model');
const UserService = require('./user.service');
const {reject} = require("bcrypt/promises");

class Post {
    static getAll = () => {

        return PostModal.find()
            .populate('owner', 'firstName lastName about')
            .populate('category', 'name')
            .populate({
                path: 'comments',
                populate: {path: 'user', select: 'firstName lastName'}
            })
            .sort({createdAt: -1})
            .exec();
    }

    static getById = id => {
        return PostModal.findOne({_id: id})
            .populate('owner', 'firstName lastName')
            .populate('category', 'name')
            .exec();
    }

    static add = (title, slug, description, owner, category, image) => {
        const post = new PostModal({
            title: title,
            slug: slug,
            description: description,
            owner: owner,
            category: category,
            image: image
        })

        return post.save();
    }

    static delete = id => {
        return PostModal.deleteOne({_id: id});
    }
}

module.exports = Post;