const express = require('express');
const router = express.Router();
const config = require('config');
const axios = require('axios');
const { check, validationResult } = require('express-validator');

// Northwind URL
const ordersApi = config.get('NORTHWIND_API') + 'orders/';

// Axios Configuration for POST and PUT Requests
const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// @route GET  api/orders
// @desc Get all orders
// @access Public
router.get('/', async (req, res) => {
  try {
    let data = await axios.get(ordersApi);

    res.json(data.data);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/orders/:id
// @desc      Get order by id
// @access    Public
router.get('/:id', async (req, res) => {
  try {
    let contact = await axios.get(ordersApi + req.params.id);

    res.json(contact.data);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: 'Contact not found' });
  }
});

// @route POST  api/orders
// @desc Add new order
// @access Public
router.post(
  '/',
  [
    [check('customerId', 'customerId is required').not().isEmpty()],
    [check('employeeId', 'employeeId is required').not().isEmpty()],
    [check('orderDate', 'orderDate is required').not().isEmpty()],
    [check('requiredDate', 'requiredDate is required').not().isEmpty()],
    [check('shippedDate', 'shippedDate is required').not().isEmpty()],
    [check('shipName', 'shipName is required').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const postRes = await axios.post(ordersApi, req.body, axiosConfig);

      res.json(postRes.data);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route PUT  api/orders/
// @desc Update Order
// @access Public
// @note Their API does not work properly
router.put('/', async (req, res) => {
  try {
    const putRes = await axios.put(ordersApi, req.body, axiosConfig);

    res.json(putRes.data);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: 'Contact not found' });
  }
});

// @route     DELETE api/orders/:id
// @desc      Delete order by id
// @access    Public
router.delete('/:id', async (req, res) => {
  try {
    let contact = await axios.delete(ordersApi + req.params.id);

    res.json(contact.data);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: 'Contact not found' });
  }
});

module.exports = router;
