'use strict';

const logger = require('../../../config/winston')('schedule.controller.js');
const {db: {schedule}, sequelize} = require('../../../sequelize');

module.exports = {

    /**
     * 일정 목록 전체 조회
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async getScheduleList(req, res) {
        try {
            const resultList = await schedule.findAll({
                order: [
                    ['startAt', 'ASC']
                ]
            });
            res.status(200).send(resultList);
        } catch (e) {
            logger.error(e);
            res.status(500).send('server error');
        }
    },

    /**
     * 일정 상세 조회
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async getSchedule(req, res) {
        try {
            const {id} = req.params;
            const result = await schedule.findOne({
                where: {id}
            });
            res.status(200).send(result);
        } catch (e) {
            logger.error(e.message);
            res.status(500).send('server error');
        }
    },

    /**
     * 일정 등록
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async createSchedule(req, res) {
        try {
            const {title, startAt, endAt} = req.body;
            const create = await sequelize.transaction(t =>
                schedule.create({
                    title, startAt, endAt
                }, {transaction: t})
            );
            res.status(200).send(create);
        } catch (e) {
            logger.error(e.message);
            res.status(500).send('server error');
        }
    },

    /**
     * 일정 수정
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async updateSchedule(req, res) {
        try {
            const {body: {title, startAt, endAt}, params: {id}} = req;
            const update = await sequelize.transaction(t =>
                schedule.update({
                    title, startAt, endAt
                }, {
                    where: {id},
                    transaction: t
                })
            );
            res.status(200).send(update);
        } catch (e) {
            logger.error(e.message);
            res.status(500).send('server error');
        }
    },

    /**
     * 일정 삭제
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async destroySchedule(req, res) {
        try {
            const {id} = req.params;
            const destroy = await sequelize.transaction(t =>
                schedule.destroy({
                    where: {id},
                    transaction: t
                })
            );
            res.status(200).send(destroy);
        } catch (e) {
            logger.error(e.message);
            res.status(500).send('server error');
        }
    }
}
