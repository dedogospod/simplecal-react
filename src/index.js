import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.scss';
import App from './components/App';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import createStore from './store';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';
import * as ROUTES from './constants/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const history = createBrowserHistory();

const store = createStore(history);

ReactDOM.render(
    <Provider store={store}>
        <FirebaseContext.Provider value={new Firebase()}>
            <ConnectedRouter history={history}>
                <Route path={ROUTES.HOME}>
                    <App history={history}/>
                </Route>
            </ConnectedRouter>
        </FirebaseContext.Provider>
        <ToastContainer autoClose={3000} hideProgressBar={true} />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
