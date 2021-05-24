const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
// const { Pool } = require('pg');

app.use(express.json());
app.use(cors());
morgan('tiny')

app.listen(3000, function() {
    console.log('Server is Running and FMC');
})