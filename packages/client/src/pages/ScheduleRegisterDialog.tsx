import React from 'react';
import { useRecoilState } from 'recoil';
import { scheduleDialogOpenState } from 'states/calendar';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogAction,
    Button
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
                tttttttttttttttttttttttttttttttttttt
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