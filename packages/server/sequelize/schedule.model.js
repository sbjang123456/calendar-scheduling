'use strict';

module.exports = (database, DataTypes) => {
    const schedule = database.define('schedule', {
        id: { field: "id", type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, comment: "아이디" },
        title: { field: "title", type: DataTypes.STRING(256), allowNull: false, comment: "일정제목" },
        startAt: { field: "start_at", type: DataTypes.DATE, allowNull: false, comment: "시작날짜" },
        endAt: { field: "end_at", type: DataTypes.DATE, allowNull: false, comment: "종료날짜" },
        createdAt: { field: "created_at", type: DataTypes.DATE, comment: "등록일" },
        updatedAt: { field: "updated_at", type: DataTypes.DATE, comment: "수정일" },
    }, {
        classMethods: {},
        tableName: 'th_schedule_mng',
        freezeTableName: true,
        underscored: true,
        timestamps: true,
    });

    return schedule;
};
