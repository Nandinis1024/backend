const mongoose = require('mongoose');
const Joi = require('joi');
const { toJSON } = require('./plugins');

const productFeaturesSchema = mongoose.Schema(
    {
        isInactive: 
        { 
            type: Boolean, 
            default: false 
        },
        isVisibleOnUi: { 
            type: Boolean, 
            default: true 
        },
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        createdBy: { 
            type: String
        },
        updatedBy: { 
            type: String
        },
    },
    {
        timestamps: true,
    }
)


const ProductFeatures = mongoose.model('ProductFeatures', productFeaturesSchema);

module.exports = ProductFeatures;