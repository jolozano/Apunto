require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const { Pool } = require('pg');

app.use(express.json());
app.use(cors());
morgan('tiny')

app.use(express.static('./public'))
const pool = new Pool ({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get('/api/posts', (req, res) => {
    if (Object.keys(req.query).length != 0) {
        pool.query("SELECT * FROM posts WHERE (subject || post) LIKE $1;", ['%' + req.query.search + '%'], (err, data) => {
            if (err) {
                console.log('error', err);
                res.status(404).send(err.message)
            } else {
                console.log(data.rows)
                res.json(data.rows);
            }
        })
    } else {
        pool.query('SELECT * FROM posts ORDER BY id DESC LIMIT 5;', (err, data) => {
            if (err) {
                console.log('error', err);
                res.status(404).send('NOT FOUND')
            } else {
                res.json(data.rows);
            }
        })
    }
});

app.post('/api/posts', (req, res) => {
    pool.query("INSERT INTO posts (date, subject, post) VALUES (CURRENT_TIMESTAMP, $1, $2);", [req.body.subject, req.body.post], (err, data) => {
        if (err) {
            console.log('error',err)
            res.status(404).send('NOT FOUND');
        } else {
            console.log(req.body)
            res.json('Post has been saved.')
        }
    });
})

app.listen(process.env.PORT, function() {
    console.log(`Server is Running and FMC on ${process.env.PORT}`);
})