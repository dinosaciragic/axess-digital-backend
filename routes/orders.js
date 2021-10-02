const express = require('express');
const router = express.Router();
const config = require('config');
const axios = require('axios');
const flatted = require('flatted');

// @route POST  api/orders
// @desc Get all orders
// @access Public
router.get('/', async (req, res) => {
  try {
    let data = await axios.get('https://northwind.vercel.app/api/orders');

    res.json(data.data);
  } catch (error) {
    console.log('error', error);
  }
});

module.exports = router;
