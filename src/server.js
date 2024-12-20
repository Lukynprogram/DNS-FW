const express = require('express');
const bodyParser = require('body-parser');
const recordsRoutes = require('./routes/records');

const app = express();

app.use(bodyParser.json());
app.use('/records', recordsRoutes);

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});