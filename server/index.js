const express = require("express");
const app = express();
const cors = require('cors');
const PORT = 3001;
const API_URL = 'http://localhost';

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

app.get('/getRangeMinAndMax', (__, res) => {
    res.status(200).json({ min: 20, max: 150 })
});
app.get('/getRangeArray', (__, res) => {
    res.status(200).json({ rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] })
});

app.listen(PORT, () => {
    console.log(`
    ********************************************************
    ****************** WELCOME *****************************
    * Server connected, listening on ${API_URL}:${PORT} *
    ********************************************************
    `);
})
