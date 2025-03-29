const Payment = require('../models/Payment')

module.exports.indexController = (req, res) => {
    res.render('index');
}

const razorpay = require('../config/razorpay');

module.exports.CreateOrder = async (req, res) => {

    try {
        const order = await razorpay.orders.create({
            amount: 5000 * 100, // amount in smallest currency unit
            currency: "INR",
        });
        res.send(order);

        const newPayment = await Payment.create({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            status: 'pending',
        });

    } catch (error) {
        res.status(500).send('Error creating order');
    }
}

module.exports.verifyPayment = async (req, res) => {
    const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET

    try {
        const { validatePaymentVerification } = require('../../node_modules/razorpay/dist/utils/razorpay-utils.js')

        const result = validatePaymentVerification(
            {
                "order_id": razorpayOrderId,
                "payment_id": razorpayPaymentId
            },
            signature,
            secret);

        if (result) {
            const payment = await Payment.findOne({ orderId: razorpayOrderId });
            payment.paymentId = razorpayPaymentId;
            payment.signature = signature;
            payment.status = 'completed';
            await payment.save();
            res.json({ status: 'success' });
        } else {
            res.status(400).send('Invalid signature');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error verifying payment');
    }
}


