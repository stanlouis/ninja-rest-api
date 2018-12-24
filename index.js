const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const routes = require('./routes/api');

const app = express();

app.use(helmet());
app.use(morgan('short'));

//parse incoming requests with JSON payloads 
app.use(express.json());

app.use('/api', routes);

const PORT = 3000;

app.listen(process.env.port || PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);
