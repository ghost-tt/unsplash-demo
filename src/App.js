import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Image from './components/Image';

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/image/:id" exact component={Image} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}


export default App;
