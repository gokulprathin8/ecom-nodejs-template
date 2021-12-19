const app = require('./app');
require('dotenv').config();

app.listen(process.env.PORT, () => `Started server on ${process.env.PORT}`);
