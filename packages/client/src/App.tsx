import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ScheduleCalendarPage, ComponentsPage } from 'pages';

function App() {
    return (
        <Switch>
            <Route exact path='/schedule' component={ScheduleCalendarPage} />
            <Route exact path={'/'}>
                <Redirect to={'/schedule?viewType=month'} />
            </Route>
            <Route exact path={'/components'} component={ComponentsPage} />
        </Switch>
    );
}

export default App;
