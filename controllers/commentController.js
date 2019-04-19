const mongoose = require("mongoose");

const Comment = mongoose.model("Comment");

exports.findCommentById = (req, res) => {
    const CommentId = req.params.id;
    Comment.findById(CommentId)
        .exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: "Cannot find the comment",
                    data: []
                });
            } else {
                res.status(200).json({
                    message: "Get OK",
                    data: doc
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to find the comment',
                data: []
            });
        });
};

exports.createComment = (req, res) => {
    let comment = req.body;
    comment = new Comment(comment);

    Comment
        .save()
        .then(doc => {
            res.status(201).json({
                message: "Comment Ok",
                data: doc
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed to create a Comment"
            })
        })
};

exports.updateCommentById = (req, res) => {
    const comment = req.body;
    const commentId = req.params.id;
    Comment.findByIdAndUpdate(commentId, {
            $set: comment
        }, {
            new: true
        })
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "Update Ok",
                data: doc
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed to update a comment",
                data: []
            });
        });

}

exports.deleteCommentById = (req, res) => {
    const commentId = req.params.id;
    Comment.findByIdAndDelete(commentId)
        .exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: "Cannot find the comment",
                    data: []
                });
            } else {
                res.status(200).json({
                    messahe: "Delete OK",
                    data: doc
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed to delete a comment",
                data: []
            });
        });

};