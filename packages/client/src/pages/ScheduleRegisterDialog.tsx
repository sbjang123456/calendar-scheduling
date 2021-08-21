import React from 'react';
import { useRecoilState } from 'recoil';
import { scheduleDialogOpenState } from 'states/calendar';
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

const ScheduleRegisterDialog = (): React.ReactElement => {
    const [scheduleDialogOpen, setScheduleDialogOpen] = useRecoilState(scheduleDialogOpenState);

    const handleDialogToggle = () => {
        setScheduleDialogOpen(!scheduleDialogOpen);
    };

    return (
        <Dialog
            open={scheduleDialogOpen}
            onClose={handleDialogToggle}
        >
            <DialogTitle onClose={handleDialogToggle}>일정 만들기</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item size={12}>
                        <TextBox
                            label='일정 제목을 입력하세요'
                            fullWidth
                        />
                    </Grid>
                    <Grid item size={6}>
                        <TextBox
                            type='date'
                            label='시작 날짜'
                            fullWidth
                        />
                    </Grid>
                    <Grid item size={6}>
                        <TimeSelectBox
                            label='시작 시간'
                            fullWidth
                        />
                    </Grid>
                    <Grid item size={6}>
                        <TextBox
                            type='date'
                            label='종료 날짜'
                            fullWidth
                        />
                    </Grid>
                    <Grid item size={6}>
                        <TimeSelectBox
                            label='종료 시간'
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogAction>
                <Button
                    onClick={handleDialogToggle}
                >
                    취소
                </Button>
                <Button color='black'>
                    저장
                </Button>
            </DialogAction>
        </Dialog>
    );
};

export default ScheduleRegisterDialog;