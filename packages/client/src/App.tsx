import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ScheduleCalendarPage } from 'pages';

function App() {
    return (
        <Switch>
            <Route exact path='/schedule' component={ScheduleCalendarPage} />
            <Route exact path={'/'}>
                <Redirect to={'/schedule?viewType=month'} />
            </Route>
        </Switch>
    );
}

export default App;
