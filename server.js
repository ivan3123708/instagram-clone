const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server is running now...');
});

