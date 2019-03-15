import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

class Header extends React.Component {
  render() {
    return (
        <header>ANIME learning</header>
    )
  }
}

class Footer extends React.Component {
  render() {
    return (
    <footer>I'm a footer</footer>
    )
  }
}


ReactDOM.render(
  <div>
    <Header /> 
    <App />
    <Footer />
  </div>,              
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
