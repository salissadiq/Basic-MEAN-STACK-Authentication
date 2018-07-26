const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/api');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = 5000;
app.use(bodyParser.json());

app.use('/api', api);
app.get('/', (req, res)=> {
    res.send('Hello salscodes');
});

app.listen(PORT, ()=>{
    console.log('Server running on port ', PORT);
})