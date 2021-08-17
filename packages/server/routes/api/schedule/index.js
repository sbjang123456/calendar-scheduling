const router = require('express').Router();
const controller = require('./schedule.controller');

router.get('/', controller.getScheduleList);
router.get('/:id', controller.getSchedule);
router.post('/', controller.createSchedule);
router.put('/:id', controller.updateSchedule);
router.delete('/:id', controller.destroySchedule);

module.exports = router;