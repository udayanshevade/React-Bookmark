import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);

registerServiceWorker();
