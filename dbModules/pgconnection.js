const {Pool, Client} = require('pg');

exports.getPg = function() {
    let pool = new Pool({
        user: 'postgres',
        host: '35.186.153.198',
        database: 'cloudpc',
        password: '7777',
        port: 5432,
      });
    return pool;
}
exports.getPgClient = () => {
    let client = new Client({
        user: 'postgres',
        host: '35.186.153.198',
        database: 'cloudpc',
        password: '7777',
        port: 5432,
    });
    return client;
};