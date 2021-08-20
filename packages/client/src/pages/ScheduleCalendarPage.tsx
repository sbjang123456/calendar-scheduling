import './ScheduleCalendarPage.scss';

import React from 'react';
import { Button, ButtonGroup } from 'components';
import { useRouter } from 'hooks';

const ScheduleCalendarPage = (): React.ReactElement => {
    const { query } = useRouter();
    console.log(query)

    return (
        <div className='container'>
            <header>
                <div className='toolbar'>
                    <Button color='white' shape='round'>오늘</Button>
                    <div className='title'>
                        <Button color='white' shape='circle'>{'<'}</Button>
                        <h2>2021년 7월</h2>
                        <Button color='white' shape='circle'>{'>'}</Button>
                    </div>
                    <ButtonGroup>
                        <Button color='black'>월</Button>
                        <Button color='white'>주</Button>
                    </ButtonGroup>
                </div>
            </header>
            <main>
                main

            </main>
        </div>
    )
};

export default ScheduleCalendarPage;