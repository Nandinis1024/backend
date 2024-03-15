const mongoose = require('mongoose');
const { toJSON } = require('./plugins');


const productSchema = mongoose.Schema(
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
        productName: { 
            type: String,
            required: true
             
        },
        productDescription: { 
            type: String, 
            maxlength: 250,
            required: true 
        },
        maxActiveUsersCount: { 
            type: Number,
            required: true

        },
        createdBy: { 
            type: String,
        },
        updatedBy: { 
            type: String,
        },
        features: [{
        }]
    },
    {
        timestamps: true,
    }
)


const Product = mongoose.model('Product', productSchema);

module.exports = Product;