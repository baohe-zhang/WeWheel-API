const mongoose = require("mongoose");
const url = require("url");

const Comment = mongoose.model("Comment");

exports.findComments = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (!parsedUrl.search) {
    Comment.find()
      .limit(100)
      .exec()
      .then(docs => {
        res.status(200).json({
          message: "GET OK",
          data: docs
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Failed to get comments",
          data: []
        });
      });
  } else {
    // build query
    let query = Comment.find();
    if (parsedUrl.query.where)
      query = query.where(JSON.parse(parsedUrl.query.where));
    if (parsedUrl.query.sort)
      query = query.sort(JSON.parse(parsedUrl.query.sort));
    if (parsedUrl.query.select)
      query = query.select(JSON.parse(parsedUrl.query.select));
    if (parsedUrl.query.skip)
      query = query.skip(JSON.parse(parsedUrl.query.skip));
    if (parsedUrl.query.count)
      query = query.count(JSON.parse(parsedUrl.query.count));
    if (parsedUrl.query.limit)
      query = query.limit(JSON.parse(parsedUrl.query.limit));
    else query = query.limit(100);
    // execute query
    query
      .exec()
      .then(docs => {
        res.status(200).json({
          message: "GET OK",
          data: docs
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Failed to get comments",
          data: []
        });
      });
  }
};

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
        message: "Failed to find the comment",
        data: []
      });
    });
};

exports.createComment = (req, res) => {
  let comment = req.body;
  comment = new Comment(comment);
  comment
    .save()
    .then(doc => {
      res.status(201).json({
        message: "Comment Ok",
        data: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to create a comment"
      });
    });
};

exports.updateCommentById = (req, res) => {
  const comment = req.body;
  const commentId = req.params.id;
  Comment.findByIdAndUpdate(
    {
      _id: req.params.userId
    },
    {
      $set: req.body
    },
    {
      $multi: true
    }
  )
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
};

exports.deleteCommentById = (req, res) => {
  const commentId = req.params.id;
  console.log("req");
  console.log(req);
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
