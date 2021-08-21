import React, { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { scheduleDialogOpenState } from 'states/calendar';
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
import { scheduleDataInterface, createSchedule } from 'service/schedule.service';
import { getTodayHmSettings, dateValidate } from 'utils/dateUtils';

const ScheduleRegisterDialog = (): React.ReactElement => {
    const [scheduleDialogOpen, setScheduleDialogOpen] = useRecoilState(scheduleDialogOpenState);
    const setConfirmDialog = useSetRecoilState(confirmDialogState);

    const [formData, setFormData] = useState<scheduleDataInterface>({
        title: ''
    });

    const handleDialogClose = () => {
        setScheduleDialogOpen('');
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
                title: '제목은 필수 값 입니다.'
            });
        } else if (!dateValidate(`${formData?.startAtDate} ${formData?.startAtTime}`, `${formData?.endAtDate} ${formData?.endAtTime}`)) {
            setConfirmDialog({
                open: true,
                title: '시작날짜보다 종료날짜가 이 전 이거나, 같은 날짜에서 시작시간 및 종료시간은 같을 수 없습니다.'
            });
        } else {
            try {
                await createSchedule(formData);
                handleDialogClose();
            } catch (e) {
                setConfirmDialog({
                    open: true,
                    title: '처리 중 서버 에러 발생. 다시 시도하여주십시오.'
                });
            }
        }
    };

    useEffect(() => {
        const [startAtTime, endAtTime] = getTodayHmSettings();
        setFormData(prev => ({
            ...prev,
            startAtDate: scheduleDialogOpen,
            endAtDate: scheduleDialogOpen,
            startAtTime,
            endAtTime
        }));
        return () => setFormData({ title: '' });
    }, [scheduleDialogOpen]);

    return (
        <Dialog
            open={!!scheduleDialogOpen}
            onClose={handleDialogClose}
        >
            <DialogTitle onClose={handleDialogClose}>일정 만들기</DialogTitle>
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