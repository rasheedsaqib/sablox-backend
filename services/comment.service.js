const CommentModel = require('../models/comments.model');
const PostModel = require('../models/post.model');

class Comment {
    static addComment = (content, user, post) => {
        return new Promise((resolve, reject) => {
            let createdComment;
            const comment = new CommentModel({
                content: content,
                user: user,
                postId: post
            });
            comment.save()
                .then(comment => {
                    createdComment = comment
                    return PostModel.findOne({_id: post});
                })
                .then(post => {
                    post.comments.push(createdComment._id);
                    return post.save();
                })
                .then(() => {
                    resolve(createdComment);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    static deleteComment = (id, userId) => {
        return new Promise((resolve, reject) => {

            let postId;
            CommentModel.findOne({_id: id})
                .then(comment => {
                    if(!comment)
                        reject(new Error('Comment not found!'));
                    if(comment.user.toString() !== userId)
                        reject(new Error('Not authorized.'));

                    postId = comment.postId;
                    return CommentModel.deleteOne({_id: id})
                })
                .then(comment => {
                    return PostModel.findOne({_id: postId});
                })
                .then(post => {
                    post.comments.pull(id);
                    return post.save();
                })
                .then(post => {
                    resolve('Comment deleted successfully!')
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}

module.exports = Comment;