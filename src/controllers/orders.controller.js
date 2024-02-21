const { Product} = require("../models");
const { ProductValidity } = require("../models");
const { ProductPricing } = require("../models");
const { OrderHistory } = require("../models");

const createOrderHistory =  async (req, res) => {
    const prevOrderHistory = await OrderHistory.findOne({productId: req.body.productId, createdBy: req.body.userId});
    if(!prevOrderHistory){
    const { userId, productId, paymentId, paymentStatus } = req.body;
    const newOrderHistory = new OrderHistory({
        createdBy: userId,
        updatedBy: userId,
        productId: productId,
        paymentId: paymentId,
        paymentStatus: paymentStatus
    });
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(400).json({ message: 'Product not found' });
    }
    else{
        newOrderHistory.productName = product.productName;
        newOrderHistory.productDescription = product.productDescription;
        newOrderHistory.maxActiveUsersCount = product.maxActiveUsersCount;
        newOrderHistory.features = product.features;
    }
    const productValidity = await ProductValidity.findOne({productId: productId});
    if(!productValidity){
        return res.status(400).json({ message: 'Product Validity not found' });
    }
    else{
        newOrderHistory.productValidityId = productValidity._id;
        newOrderHistory.validityInDays = productValidity.validityInDays;
        newOrderHistory.validityOptionTitle = productValidity.validityOptionTitle;
    }
    const productPricing = await ProductPricing.findOne({productId: productId});
    if(!productPricing){
        return res.status(400).json({ message: 'Product Pricing not found' });
    }
    else{
        newOrderHistory.productPricingPerValidityId = productPricing._id;
        newOrderHistory.basePrice = productPricing.basePrice;
        newOrderHistory.maxAbsoluteDiscount = productPricing.maxAbsoluteDiscount;
        const finalPrice = productPricing.basePrice - ((productPricing.maxAbsoluteDiscount / 100) * productPricing.basePrice);
        newOrderHistory.finalPrice = finalPrice;
    }
    newOrderHistory.paymentId = paymentId;
    newOrderHistory.paymentStatus = paymentStatus;
    newOrderHistory.save();
    res.status(201).json({ message: 'Order History created' });
}
else{
    return res.status(400).json({ message: 'Order History already exists' });
}
};

module.exports = {
    createOrderHistory
}