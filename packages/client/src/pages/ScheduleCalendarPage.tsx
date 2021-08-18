import React from 'react';
import { useRouter } from 'hooks';

const ScheduleCalendarPage = (): React.ReactElement => {
    const { query } = useRouter();
    console.log(query)

    return (
        <div>
            <header>
                header
            </header>
            <main>
                main
            </main>
        </div>
    )
};

export default ScheduleCalendarPage;