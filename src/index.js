import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import logo from './imgs/logo4.png';
import anilist from './imgs/anilist.png';

class Header extends React.Component {
  render() {
    return (
        <header>
          <div className="flex flex-row wrap max960 justify-between align-center">
          <div className="flex flex-row wrap align-center justify-center">
            <img id="logo" src={logo} alt="logo"/>
            <h1>Japanese Boot Camp</h1>
          </div>            
            <a href="https://www.tofugu.com/japanese/how-to-install-japanese-keyboard/" target="blank">Install Japanese keyboard</a>
          </div>          
        </header>
        
    )
  }
}

class Footer extends React.Component {
  render() {
    return (
    <footer>
      <div className="flex flex-row max960 justify-end">
      <h5>
        Game powered thanks to Anilist API
        <a href="https://anilist.gitbook.io/anilist-apiv2-docs/" target="blank">
          <img id="anilist" src={anilist} alt="anilist API"/>
        </a>
      </h5>
      </div>      
    </footer>
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
