'use strict';

const router = require('express').Router();
const schedule = require('./schedule');

router.use('/schedule', schedule);

module.exports = router;