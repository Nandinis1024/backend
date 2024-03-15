const e = require("express");

const validateProducts = (schema)=>async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req?.body);
        req.body = parseBody;
        next();
    }
    catch (err) {
        let errorMessages = [];
        try {
            const errorMessageArray = JSON.parse(err.message);
            errorMessages = errorMessageArray.map(error => error.message);
        } catch (parseError) {
            errorMessages = [err.message || "Validation error"];
        }
        console.error(errorMessages);
        res.status(500).json({ message: errorMessages});
    }
}

module.exports = validateProducts;