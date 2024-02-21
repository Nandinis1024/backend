const { ProductFeatures } = require("../models");

const createFeatures = async (req, res) => {
    const newFeatures = new ProductFeatures(
        {
            title: req.body.title,
            description: req.body.description,
            createdBy: req.body.userId,
            updatedBy: req.body.userId
        }
    );
    await newFeatures.save();
    res.json(newFeatures);
};

const getFeatures = async (req, res) => {
    const features = await ProductFeatures.find();
    res.json(features);
};

module.exports = {
    createFeatures,
    getFeatures
};