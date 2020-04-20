
var express = require('./config/express.js');

// Use env port or default
const port = process.env.QUOTAGUARDSTATIC_URL || 5000;
//const port = 5000;

const app = express.init()
app.listen(port, () => console.log(`Server now running on port ${port}!`));
