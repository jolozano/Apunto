const { Pool } = require('pg');

const pool = new Pool ({
    user: 'josee.lozanojr.',
    host: 'localhost',
    database: 'apunto',
    port: 5432,
});

module.exports = pool;