import './ScheduleCalendarPage.scss';

import React, { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { arrDateState } from 'states/calendar';
import { confirmDialogState } from 'states/common';
import { useRouter } from 'hooks';
import { DateUtils } from 'utils';

import ScheduleRegisterDialog from './ScheduleRegisterDialog';
import ScheduleCalendarHeader from './ScheduleCalendarHeader';
import ScheduleCalendarContent from './ScheduleCalendarContent';

import { Dialog, DialogTitle, DialogContent, DialogAction, Button } from 'components';

const ScheduleCalendarPage = (): React.ReactElement => {
    const { query: { sViewType, sYear, sMonth, sDate }, push } = useRouter();

    // const setViewType = useSetRecoilState(viewTypeState);
    const setArrDate = useSetRecoilState(arrDateState);
    const confirmDialog = useRecoilValue(confirmDialogState);
    const setConfirmDialog = useResetRecoilState(confirmDialogState);

    const confirmDialogOpenToggle = () => {
        setConfirmDialog();
    };

    useEffect(() => {
        if (!sViewType || !sYear || !sMonth || !sDate) {
            const arrCurrentDate = DateUtils.getDate();
            setArrDate(arrCurrentDate);
            push(`/schedule/calendar/${sViewType}/${arrCurrentDate[0]}/${arrCurrentDate[1]}/${arrCurrentDate[2]}`);
        } else {
            // setViewType(sViewType);
            setArrDate([sYear, sMonth, sDate]);
        }
    }, [sViewType, sYear, sMonth, sDate]);

    return (
        <div className='container'>
            <ScheduleCalendarHeader />
            <ScheduleCalendarContent />
            <ScheduleRegisterDialog />

            <Dialog
                open={confirmDialog?.open}
            >
                <DialogTitle onClose={confirmDialogOpenToggle}>{confirmDialog?.title}</DialogTitle>
                {confirmDialog?.content && <DialogContent>{confirmDialog?.content}</DialogContent>}
                <DialogAction>
                    {confirmDialog?.type
                        ? (
                            <>
                                <Button
                                    onClick={confirmDialogOpenToggle}
                                >
                                    취소
                                </Button>
                                <Button
                                    color='black'
                                    onClick={confirmDialog?.action}
                                >
                                    {confirmDialog?.type}
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={confirmDialogOpenToggle}
                            >
                                확인
                            </Button>
                        )
                    }
                </DialogAction>
            </Dialog>
        </div>
    );
};

export default ScheduleCalendarPage;