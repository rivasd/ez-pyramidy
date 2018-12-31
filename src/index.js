import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    (<main>
        <header>
            <h3>EZ-Pyramidy</h3>
            <h4>Le système de jeu Pyramide FACILE à utiliser</h4>
        </header>
        <section>
            <App />
        </section>
    </main>
    ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
