const express = require('express')
const router = express.Router()

const {getAllQuery,createQuery} = require('../controllers/query')

//create query
router.post('/query/createQuery',createQuery)


//read query
router.get('/query/getQueries',getAllQuery)

module.exports = router;
