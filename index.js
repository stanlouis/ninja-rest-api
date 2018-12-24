const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');

const routes = require('./routes/api');

const app = express();

// connect to mongodb
mongoose.connect(
  'mongodb://localhost/ninjago',
  { useNewUrlParser: true }
);
app.use(helmet());
app.use(morgan('short'));

//middleware to parse incoming requests with JSON payloads
app.use(express.json());

// initialize route
app.use('/api', routes);

//error handling middleware
app.use((err, req, res, next) => {
  res.status(422).send({ error: err._message });
});

const PORT = 3000;

app.listen(process.env.port || PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);
