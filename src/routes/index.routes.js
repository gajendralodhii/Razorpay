const { Router } = require('express');
const router = Router();
const controller = require('../controllers/index.controller')


router.get('/', controller.indexController);

router.post('/create/orderId', controller.CreateOrder);

router.post('/api/payment/verify', controller.verifyPayment);



module.exports = router;