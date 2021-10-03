const express = require('express');
const router = express.Router();
const config = require('config');
const axios = require('axios');
const { check, validationResult } = require('express-validator');

// Northwind URL
const categoriesApi = config.get('NORTHWIND_API') + 'categories/';

// Axios Configuration for POST and PUT Requests
const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// @route GET  api/categories
// @desc Get all categories
// @access Public
router.get('/', async (req, res) => {
  try {
    let data = await axios.get(categoriesApi);

    res.json(data.data);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/categories/:id
// @desc      Get category by id
// @access    Public
router.get('/:id', async (req, res) => {
  try {
    let contact = await axios.get(categoriesApi + req.params.id);

    res.json(contact.data);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: 'Contact not found' });
  }
});

// @route POST  api/categories
// @desc Add new category
// @access Public
router.post(
  '/',
  [
    [check('description', 'description is required').not().isEmpty()],
    [check('name', 'name is required').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const postRes = await axios.post(categoriesApi, req.body, axiosConfig);

      res.json(postRes.data);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route PUT  api/categories/
// @desc Update category
// @access Public
// @note Their API does not work properly
router.put('/', async (req, res) => {
  try {
    const putRes = await axios.put(categoriesApi, req.body, axiosConfig);

    res.json(putRes.data);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: 'Contact not found' });
  }
});

// @route     DELETE api/categories/:id
// @desc      Delete category by id
// @access    Public
router.delete('/:id', async (req, res) => {
  try {
    let contact = await axios.delete(categoriesApi + req.params.id);

    res.json(contact.data);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: 'Contact not found' });
  }
});

module.exports = router;
