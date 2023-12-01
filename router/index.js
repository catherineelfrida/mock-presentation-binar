const express = require('express')
const router = express.Router()
const auth = require('./auth')
const lists = require('./lists')

router.use(auth);
router.use(lists);

module.exports = router;