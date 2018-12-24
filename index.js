const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const routes = require('./routes/api');

const app = express();

app.use(helmet());
app.use(morgan('short'));

app.use('/api', routes);

const PORT = 3000;

app.listen(process.env.port || PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);
