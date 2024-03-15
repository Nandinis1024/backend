const {z} = require('zod');


const productFeaturesSchema = z.object({
    title: z.string({required_error: 'Title is required'}),
    description: z.string({required_error: 'Description is required'}),
    createdBy: z.string().nullable().optional(), // Make createdBy optional
    updatedBy: z.string().nullable().optional(),
}).nonstrict();

module.exports = productFeaturesSchema;
