const { Pool } = require('pg');

const pool = new Pool({
    user: 'luisVelasco',
    host: 'localhost',
    database: 'registro_cliente',
    password: 'Vu12-001',
    port: 5432, 
});

module.exports = pool;
