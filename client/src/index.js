import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import {Provider} from 'react-redux';
import {Router, Route, Switch} from 'react-router-dom';
import {App} from './components';
import store from './store';
import '../resources/scss/style.scss';

ReactDOM.render(
            <Router history={createHistory()}>
                <Provider store={store}>
                    <Switch>
                        
                            <Route path='/' component={App}/>
                    
                    </Switch>
                </Provider>
            </Router>,
            document.getElementById('root')
            );