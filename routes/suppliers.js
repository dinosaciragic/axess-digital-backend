const express = require('express');
const router = express.Router();
const config = require('config');
const axios = require('axios');
const { check, validationResult } = require('express-validator');

// Northwind URL
const suppliersApi = config.get('NORTHWIND_API') + 'suppliers/';

// Axios Configuration for POST and PUT Requests
const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// @route GET  api/suppliers
// @desc Get all suppliers
// @access Public
router.get('/', async (req, res) => {
  try {
    let data = await axios.get(suppliersApi);

    res.json(data.data);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/suppliers/:id
// @desc      Get supplier by id
// @access    Public
router.get('/:id', async (req, res) => {
  try {
    let contact = await axios.get(suppliersApi + req.params.id);

    res.json(contact.data);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: 'Contact not found' });
  }
});

// @route POST  api/suppliers
// @desc Add new supplier
// @access Public
router.post(
  '/',
  [
    [check('companyName', 'companyName is required').not().isEmpty()],
    [check('contactName', 'contactName is required').not().isEmpty()],
    [check('contactTitle', 'contactTitle is required').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const postRes = await axios.post(suppliersApi, req.body, axiosConfig);

      res.json(postRes.data);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route PUT  api/suppliers/
// @desc Update supplier
// @access Public
// @note Their API does not work properly
router.put('/', async (req, res) => {
  try {
    const putRes = await axios.put(suppliersApi, req.body, axiosConfig);

    res.json(putRes.data);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: 'Contact not found' });
  }
});

// @route     DELETE api/suppliers/:id
// @desc      Delete supplier by id
// @access    Public
router.delete('/:id', async (req, res) => {
  try {
    let contact = await axios.delete(suppliersApi + req.params.id);

    res.json(contact.data);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: 'Contact not found' });
  }
});

module.exports = router;
