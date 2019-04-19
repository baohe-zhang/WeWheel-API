const mongoose = require("mongoose");

Rate = mongoose.model("Rate");

exports.findRateById = (req, res) => {
    const RateId = req.params.id;
    Rate.findById(RateId)
        .exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: "Cannot find the rate",
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
                message: 'Failed to find the rate',
                data: []
            });
        });
};

exports.createRate = (req, res) => {
    let rate = req.body;
    rate = new Rate(rate);

    Rate
        .save()
        .then(doc => {
            res.status(201).json({
                message: "Rate Ok",
                data: doc
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed to create a Rate"
            })
        })
};

exports.updateRateById = (req, res) => {
    const rate = req.body;
    const rateId = req.params.id;
    Rate.findByIdAndUpdate(rateId, {
            $set: rate
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
                message: "Failed to update a rate",
                data: []
            });
        });

}

exports.deleteRateById = (req, res) => {
    const rateId = req.params.id;
    Rate.findByIdAndDelete(rateId)
        .exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    message: "Cannot find the rate",
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
                message: "Failed to delete a rate",
                data: []
            });
        });

};