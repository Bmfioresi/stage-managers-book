const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.json({message: "Test successful"});
});

app.listen(8000, () => {
    console.log('Server is running on port 8000.');
});