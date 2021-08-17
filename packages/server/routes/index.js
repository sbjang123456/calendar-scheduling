'use strict';

const router = require('express').Router();
const api = require('./api');

router.use('/api/v1', api);

module.exports = router;
