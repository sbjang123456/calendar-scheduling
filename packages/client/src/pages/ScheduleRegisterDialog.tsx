import React, { useState, useEffect } from 'react';
import {
    useRecoilState,
    useSetRecoilState,
    useResetRecoilState,
    useRecoilValueLoadable
} from 'recoil';
import {
    scheduleDialogOpenState,
    scheduleListSelector,
    selectedScheduleState,
    scheduleDetailSelector
} from 'states/calendar';
import { confirmDialogState } from 'states/common';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogAction,
    Button,
    Grid,
    TextBox,
    TimeSelectBox
} from 'components';
import * as ScheduleService from 'service/schedule.service';
import { DateUtils } from 'utils';
import { useLoadableContent } from 'hooks';

const ScheduleRegisterDialog = (): React.ReactElement => {
    const [scheduleDialogOpen, setScheduleDialogOpen] = useRecoilState(scheduleDialogOpenState);
    const setConfirmDialog = useSetRecoilState(confirmDialogState);
    const reset = useResetRecoilState(scheduleListSelector);
    const resetDetail = useResetRecoilState(scheduleDetailSelector);
    const resetConfirmDialog = useResetRecoilState(confirmDialogState);
    const [selectedSchedule, setSelectedSchedule] = useRecoilState(selectedScheduleState);
    const scheduleDetail = useRecoilValueLoadable(scheduleDetailSelector);
    const schedule = useLoadableContent(scheduleDetail);

    const [formData, setFormData] = useState<ScheduleService.scheduleDataInterface>({
        title: ''
    });

    const handleDialogClose = () => {
        setScheduleDialogOpen('');
        setSelectedSchedule(0);
    };

    const handleChange = (evt: any) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        });
    };

    const handleClickSave = async () => {
        if (!formData?.title) {
            setConfirmDialog({
                open: true,
                title: '알림',
                content: '제목은 필수 값 입니다.'
            });
        } else if (!DateUtils.dateValidate(`${formData?.startAtDate} ${formData?.startAtTime}`, `${formData?.endAtDate} ${formData?.endAtTime}`)) {
            setConfirmDialog({
                open: true,
                title: '알림',
                content: '시작날짜보다 종료날짜가 이 전 이거나, 같은 날짜에서 시작시간 및 종료시간은 같을 수 없습니다.'
            });
        } else {
            try {
                if (scheduleDialogOpen) {
                    await ScheduleService.createSchedule(formData);
                } else {
                    await ScheduleService.updateSchedule(selectedSchedule, formData);
                    resetDetail();
                }
                reset();
                handleDialogClose();
            } catch (e) {
                setConfirmDialog({
                    open: true,
                    title: '알림',
                    content: '처리 중 서버 에러 발생. 다시 시도하여주십시오.'
                });
            }
        }
    };

    const handleClickDelete = () => {
        setConfirmDialog({
            open: true,
            title: '알림',
            content: '해당 일정을 삭제하시겠습니까?',
            type: '삭제',
            action: async () => {
                try {
                    await ScheduleService.deleteScheduleById(selectedSchedule);
                    resetConfirmDialog();
                    handleDialogClose();
                    reset();
                } catch (e) {
                    setConfirmDialog({
                        open: true,
                        title: '알림',
                        content: '처리 중 서버 에러 발생. 다시 시도하여주십시오.'
                    });
                }
            }
        });
    };

    useEffect(() => {
        if (scheduleDialogOpen) {
            if (scheduleDialogOpen.length > 10) {
                const [date, time] = scheduleDialogOpen.split(' ');
                setFormData(prev => ({
                    ...prev,
                    startAtDate: date,
                    endAtDate: date,
                    startAtTime: time,
                    endAtTime: time,
                }));
            } else {
                const [startAtTime, endAtTime] = DateUtils.getTodayHmSettings();
                setFormData(prev => ({
                    ...prev,
                    startAtDate: scheduleDialogOpen,
                    endAtDate: scheduleDialogOpen,
                    startAtTime,
                    endAtTime
                }));
            }

        } else if (selectedSchedule && schedule) {
            const arrStartDate = DateUtils.getDate(schedule.startAt);
            const arrEndDate = DateUtils.getDate(schedule.endAt);
            setFormData({
                title: schedule.title,
                startAtDate: DateUtils.getDateFormatting(arrStartDate),
                endAtDate: DateUtils.getDateFormatting(arrEndDate),
                startAtTime: `${arrStartDate[3]}:${arrStartDate[4]}`,
                endAtTime: `${arrEndDate[3]}:${arrEndDate[4]}`
            });
        }

        return () => setFormData({ title: '' });
    }, [scheduleDialogOpen, selectedSchedule, schedule]);

    return (
        <Dialog
            open={!!scheduleDialogOpen || !!selectedSchedule}
            onClose={handleDialogClose}
        >
            <DialogTitle onClose={handleDialogClose}>일정 {!!scheduleDialogOpen ? '만들기' : '수정하기'}</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item size={12}>
                        <TextBox
                            name='title'
                            value={formData?.title}
                            label='일정 제목을 입력하세요'
                            fullWidth
                            required
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item size={6}>
                        <TextBox
                            type='date'
                            name='startAtDate'
                            value={formData?.startAtDate}
                            label='시작 날짜'
                            fullWidth
                            required
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item size={6}>
                        <TimeSelectBox
                            name='startAtTime'
                            value={formData?.startAtTime}
                            label='시작 시간'
                            fullWidth
                            required
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item size={6}>
                        <TextBox
                            type='date'
                            name='endAtDate'
                            value={formData?.endAtDate}
                            label='종료 날짜'
                            fullWidth
                            required
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item size={6}>
                        <TimeSelectBox
                            name='endAtTime'
                            value={formData?.endAtTime}
                            label='종료 시간'
                            fullWidth
                            required
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogAction>
                <Button
                    onClick={handleDialogClose}
                >
                    취소
                </Button>
                {!!selectedSchedule && (
                    <Button
                        onClick={handleClickDelete}
                    >
                        삭제
                    </Button>
                )}
                <Button
                    color='black'
                    onClick={handleClickSave}
                >
                    저장
                </Button>
            </DialogAction>
        </Dialog>
    );
};

export default ScheduleRegisterDialog;