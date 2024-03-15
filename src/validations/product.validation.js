const { z } = require("zod");

const FeatureSchema = z.record(z.string());

const productSchema = z.object({
  productName: z.string({ required_error: "Product name is required"}),
  productDescription: z.string({ required_error: "Product description is required"}),
  maxActiveUsersCount: z.number().min(1, { message: "Max active users count must be greater than 1", }),
  validityInDays: z.number().refine(value => [30, 90, 365].includes(value), {
    message: "Validity in days must be either 30, 90, or 365"
  }),
  createdBy: z.string().nullable().optional(), // Make createdBy optional
  updatedBy: z.string().nullable().optional(),
  features: FeatureSchema.default({}), // Default value for features as an object
}).nonstrict();


module.exports = productSchema;


