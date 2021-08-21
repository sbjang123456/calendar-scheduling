import './ScheduleCalendarPage.scss';

import React, { useEffect } from 'react';
import { useSetRecoilState, useRecoilState, useResetRecoilState } from 'recoil';
import { arrDateState } from 'states/calendar';
import { confirmDialogState } from 'states/common';
import { useRouter } from 'hooks';
import { DateUtils } from 'utils';

import ScheduleRegisterDialog from './ScheduleRegisterDialog';
import ScheduleCalendarHeader from './ScheduleCalendarHeader';
import ScheduleCalendarContent from './ScheduleCalendarContent';

import { Dialog, DialogTitle, DialogAction, Button } from 'components';

const ScheduleCalendarPage = (): React.ReactElement => {
    const { query: { viewType, sYear, sMonth, sDate }, push } = useRouter();

    const setArrDate = useSetRecoilState(arrDateState);
    const [confirmDialog] = useRecoilState(confirmDialogState);
    const setConfirmDialog = useResetRecoilState(confirmDialogState);

    const confirmDialogOpenToggle = () => {
        setConfirmDialog();
    };

    useEffect(() => {
        if (!sYear || !sMonth || !sDate) {
            const arrCurrentDate = DateUtils.getDate();
            setArrDate(arrCurrentDate);
            push(`/schedule/calendar/${viewType}/${arrCurrentDate[0]}/${arrCurrentDate[1]}/${arrCurrentDate[2]}`);
        } else {
            setArrDate([sYear, sMonth, sDate]);
        }
    }, [sYear, sMonth, sDate]);

    return (
        <div className='container'>
            <ScheduleCalendarHeader />
            <ScheduleCalendarContent />
            <ScheduleRegisterDialog />

            <Dialog
                open={confirmDialog?.open}
                // onClose={confirmDialogOpenToggle}
            >
                <DialogTitle>{confirmDialog?.title}</DialogTitle>
                <DialogAction>
                    <Button
                        onClick={confirmDialogOpenToggle}
                    >
                        확인
                    </Button>
                </DialogAction>
            </Dialog>
        </div>
    );
};

export default ScheduleCalendarPage;