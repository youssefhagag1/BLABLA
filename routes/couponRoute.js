const express = require('express');

const authService = require('../services/authService');
const {
  getCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} = require('../services/copunService');

const router = express.Router();

router.use(authService.protect, authService.allowTo('admin', 'manager'));

router.route('/').get(getCoupons).post(createCoupon);
router.route('/:id').get(getCoupon).patch(updateCoupon).delete(deleteCoupon);

module.exports = router;