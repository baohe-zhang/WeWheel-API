const mongoose = require("mongoose");
const Post = mongoose.model('Post');
const url = require("url");
const Car = mongoose.model('Car');
exports.createPost = (req, res) => {
    let post = req.body;

    post = new Post(post);


    post
        .save()
        .then(doc => {
            res.status(201).json({
                message: "Create Post",
                dota: doc
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed to create a post.",
                data: []
            });
        });

};

exports.updatePostById = (req, res) => {
    const post = req.body;
    const postId = req.params.postId;
    Post.findByIdAndUpdate(
            postId, {
                $set: post
            }, {
                new: true
            })
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "Update OK",
                data: doc
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed to update a post",
                data: err
            });
        });
};

exports.findPost = (req, res) => {
    console.log("hi");

    const parsedUrl = url.parse(req.url, true);
    if (!parsedUrl.search) {
        Post.find()
            .limit(100)
            .exec()
            .then(docs => {
                res.status(200).json({
                    message: "OKKKKKK",
                    data: docs
                });
            })
    } else {
        let query = Post.find();

        if (parsedUrl.query.StartDate && parsedUrl.query.EndDate) {
            query = query.find({
                StartDate: {

                    $lt: new Date(parsedUrl.query.StartDate + 'GMT-07:00').toISOString()
                }
            });

            //    console.log(new Date(parsedUrl.query.StartDate).toISOString())

            query = query.find({
                EndDate: {
                    $gte: new Date(parsedUrl.query.EndDate).toISOString()
                }
            });

        }

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

        else query = query.limit(500);
        //dkuegwh

        query
            .exec()
            .then(docs => {
                if (docs == null || docs.length == 0) {
                    res.status(404).json({
                        message: "Cannot find posts under these conditions",
                        data: []
                    });
                } else {
                    res.status(200).json({
                        message: "Find post OK 123",
                        data: docs
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: "Failed to get posts",
                    data: []
                });
            });
    }
};

exports.deletePostById = (req, res) => {
    const postId = req.params.id;
    Post.findByIdAndDelete(postId)
        .exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: 'Cannot find the post with id ${postId}',
                    data: []
                });
            } else {
                res.status(200).json({
                    message: "DELETE OK",
                    data: doc
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed to delete a post",
                data: []
            });
        });
};

exports.findPostsWithCar = (req, res) => {
    console.log("jhqwkfhjk");
    const parsedUrl = url.parse(req.url, true);

    if (!parsedUrl.search) {
        Post.find()
            .limit(100)
            .exec()
            .then(posts => {
                let carIdList = [];
                posts.map(post => {
                    if (post.CarId) {
                        carIdList.push(post.CarId);
                    }
                });
                Car.find()
                    .where({
                        _id: {
                            $in: carIdList
                        }
                    })
                    .exec()
                    .then(cars => {
                        let data = [];
                        posts.map(post => {
                            cars.forEach(car => {
                                if (post.CarId == car.id) {
                                    let postWithCar = JSON.parse(JSON.stringify(post));
                                    postWithCar.Car = car;
                                    data.push(postWithCar);
                                }
                            });
                        });
                        //  console.log(data);
                        res.status(200).json({
                            message: "OK",
                            data: data
                        });
                    });
            });
    } else {
        console.log("todo");
        let query = Post.find();

        if (parsedUrl.query.StartDate && parsedUrl.query.EndDate) {
            query = query.find({
                StartDate: {

                    $lt: new Date(parsedUrl.query.StartDate + 'GMT-07:00').toISOString()
                }
            });

            console.log(new Date(parsedUrl.query.StartDate).toISOString())

            query = query.find({
                EndDate: {
                    $gte: new Date(parsedUrl.query.EndDate).toISOString()
                }
            });

        }
        console.log(parsedUrl.query);
        if (parsedUrl.query.Capacity && parsedUrl.query.Capacity != "*")
            query = query.where({
                Capacity: parsedUrl.query.Capacity
            });
        if (parsedUrl.query.Location && parsedUrl.query.Location != "*")
            query = query.where({
                Location: parsedUrl.query.Location
            });
        if (parsedUrl.query.sort && parsedUrl.query.sort != "*")
            query = query.sort(JSON.parse(parsedUrl.query.sort));
        if (parsedUrl.query.select && parsedUrl.query.select != "*")
            query = query.select(JSON.parse(parsedUrl.query.select));
        if (parsedUrl.query.skip && parsedUrl.query.skip != "*")
            query = query.skip(JSON.parse(parsedUrl.query.skip));
        if (parsedUrl.query.count && parsedUrl.query.count != "*")
            query = query.count(JSON.parse(parsedUrl.query.count));
        if (parsedUrl.query.limit && parsedUrl.query.limit != "*")
            query = query.limit(JSON.parse(parsedUrl.query.limit));

        else query = query.limit(500);
        //dkuegwh

        query
            .exec()
            .then(posts => {
                let carIdList = [];
                posts.map(post => {
                    if (post.CarId) {
                        carIdList.push(post.CarId);
                    }
                });
                Car.find()
                    .where({
                        _id: {
                            $in: carIdList
                        }
                    })
                    .exec()
                    .then(cars => {
                        let data = [];
                        posts.map(post => {
                            cars.forEach(car => {
                                if (post.CarId == car.id) {
                                    let postWithCar = JSON.parse(JSON.stringify(post));
                                    postWithCar.Car = car;
                                    data.push(postWithCar);
                                }
                            });
                        });
                        // console.log(data);
                        res.status(200).json({
                            message: "OK",
                            data: data
                        });
                    });
            })
            .catch(err => {
                res.status(500).json({
                    message: "Failed to get posts",
                    data: []
                });
            });
    }
};