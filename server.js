const express = require('express');
const config = require('config');

const app = express();

// Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the Axess Digital API' });
});

// Define routes
app.use('/api/orders', require('./routes/orders'));

const PORT = config.get('PORT');

app.listen(PORT, () => console.log(`Server on ${PORT}`));
