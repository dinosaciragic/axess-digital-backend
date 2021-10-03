const express = require('express');
const router = express.Router();
const config = require('config');
const axios = require('axios');
const { check, validationResult } = require('express-validator');

// Northwind URL
const productsApi = config.get('NORTHWIND_API') + 'products/';

// Axios Configuration for POST and PUT Requests
const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// @route GET  api/products
// @desc Get all products
// @access Public
router.get('/', async (req, res) => {
  try {
    let data = await axios.get(productsApi);

    res.json(data.data);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/products/:id
// @desc      Get product by id
// @access    Public
router.get('/:id', async (req, res) => {
  try {
    let contact = await axios.get(productsApi + req.params.id);

    res.json(contact.data);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: 'Contact not found' });
  }
});

// @route POST  api/products
// @desc Add new product
// @access Public
router.post(
  '/',
  [
    [check('supplierId', 'supplierId is required').not().isEmpty()],
    [check('categoryId', 'categoryId is required').not().isEmpty()],
    [check('quantityPerUnit', 'quantityPerUnit is required').not().isEmpty()],
    [check('unitPrice', 'unitPrice is required').not().isEmpty()],
    [check('unitsInStock', 'unitsInStock is required').not().isEmpty()],
    [check('unitsOnOrder', 'unitsOnOrder is required').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const postRes = await axios.post(productsApi, req.body, axiosConfig);

      res.json(postRes.data);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route PUT  api/products/
// @desc Update product
// @access Public
// @note Their API does not work properly
router.put('/', async (req, res) => {
  try {
    const putRes = await axios.put(productsApi, req.body, axiosConfig);

    res.json(putRes.data);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: 'Contact not found' });
  }
});

// @route     DELETE api/products/:id
// @desc      Delete product by id
// @access    Public
router.delete('/:id', async (req, res) => {
  try {
    let contact = await axios.delete(productsApi + req.params.id);

    res.json(contact.data);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: 'Contact not found' });
  }
});

module.exports = router;
