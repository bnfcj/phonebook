require('./config/dotenvConfig');
const express = require('express');
const personRoutes = require('./routes/personRoutes');
const app = express();
app.use(require('cors')());
app.use(express.static('dist'));
if (process.env.NODE_ENV !== 'production') {
  app.use(require('morgan')('tiny'));
}
app.use(express.json());
app.use('/api/person', personRoutes);
module.exports = app;
