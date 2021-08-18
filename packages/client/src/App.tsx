import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ScheduleCalendar, ScheduleWeek } from 'pages';

function App() {
    return (
        <Switch>
            <Route exact path='/schedule/calendar' component={ScheduleCalendar} />
            <Route exact path='/schedule/week' component={ScheduleWeek} />
            <Route exact path={'/'}>
                <Redirect to={'/schedule/calendar'} />
            </Route>
        </Switch>
    );
}

export default App;
