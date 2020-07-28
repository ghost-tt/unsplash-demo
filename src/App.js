

import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Home from './components/Home';
import NotFound from './components/NotFound'

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}


export default App;
