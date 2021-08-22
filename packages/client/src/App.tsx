import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ScheduleCalendarPage, ComponentsPage } from 'pages';

function App() {
    return (
        <Switch>
            <Route exact path='/schedule/calendar/:sViewType' component={ScheduleCalendarPage} />
            {/*<Route exact path='/schedule/calendar/:sViewType/:sYear' component={ScheduleCalendarPage} />*/}
            {/*<Route exact path='/schedule/calendar/:sViewType/:sMonth/:sMonth' component={ScheduleCalendarPage} />*/}
            <Route exact path='/schedule/calendar/:sViewType/:sYear/:sMonth/:sDate' component={ScheduleCalendarPage} />
            <Route exact path={'/'}>
                <Redirect to={'/schedule/calendar/month'} />
            </Route>
            <Route exact path={'/components'} component={ComponentsPage} />
        </Switch>
    );
}

export default App;
