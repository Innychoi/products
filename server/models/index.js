const { Pool, Client } = require('pg')
// pools will use environment variables
// for connection information
const pool = new Pool({
  user: 'innychoi',
  host: 'localhost',
  database: 'products'
})

function getAll(cb) {

pool.query('SELECT * FROM features limit 10', (err, res) => {
  if (err) {
    console.log('not working here!', err)
    cb(err);
  } else {
    console.log('working here!', res)
    cb(null, res);
  }
  // pool.end()
})
}

module.exports = { getAll }