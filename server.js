const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const { Pool } = require('pg');

app.use(express.json());
app.use(cors());
morgan('tiny')

const pool = new Pool ({
    user: 'josee.lozanojr.',
    host: 'localhost',
    database: 'apunto',
    port: 5432,
});

app.get('/api/posts', (req, res) => {
    console.log('app.get worked');
    pool.query('SELECT * FROM posts ORDER BY id DESC LIMIT 5;', (err, data) => {
        if (err) {
            console.log('error', err);
            res.status(404).send('NOT FOUND')
        } else {
            res.json(data.rows);
        }
    })
});

app.post('/api/posts', (req, res) => {
    pool.query("INSERT INTO posts (date, subject, posts) VALUES (CURRENT_TIMESTAMP, $1, $2);", [req.body.subject, req.body.post], (err, data) => {
        if (err) {
            console.log('error',err)
            res.status(404).send('NOT FOUND');
        } else {
            res.json('Post has been saved.')
        }
    });
})

app.listen(3000, function() {
    console.log('Server is Running and FMC');
})