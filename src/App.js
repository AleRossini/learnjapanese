import React, {
  Component
} from 'react';
import './index.css';
import './App.css';
import {
  queryAnime
} from './query.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      titleRomaji: '',
      image: {},
      color: '',
      inputValue: '',
      open: false,
      isGoing: false,
      type: '',
      hasError: false,
      resultMessage: ''
    }
    this.nextTitle = this.nextTitle.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
    this.handleData = this.handleData.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  componentDidMount() {
    console.log("called");
    this.nextTitle();
  }

  nextTitle() {
    var variables = {
      id: Math.floor(Math.random() * 10000) + 1
    };
    this.setState({
      open: false,
      color: '',
      inputValue: '',
      resultMessage: ''
    });
      var url = 'https://graphql.anilist.co',
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: queryAnime,
          variables: variables
        })
      };
    
    fetch(url, options).then(this.handleResponse)
      .then(this.handleData)
      .catch(this.handleError);
  }

  handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  handleData(data) {
    var media = data.data.Media;
    var title = data.data.Media.title.native;
    var titleRomaji = data.data.Media.title.romaji;
    var img = data.data.Media.coverImage.extraLarge;
    var isAdult = data.data.Media.isAdult;
    var fullEng = /^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/;

    console.log(media);

    if (title === null || media === null || isAdult || fullEng.test(title)) {
      this.nextTitle()
    }
    const newStyle = {
      backgroundImage: `url(${img})`
    };
    this.setState({
      title: title,
      image: newStyle,
      titleRomaji : titleRomaji
    })
  }

  handleError(error) {
    console.log(error);
    this.nextTitle()
  }

  

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

compareTitles =(e) => {
  e.preventDefault();
    this.setState({
      inputValue: this.state.inputValue
    })
    const inputValue = this.state.inputValue;
    const titleNative = this.state.title;
    const colorRight = 'limegreen';
    const colorWrong = 'tomato';
    if (inputValue === titleNative) {
      console.log("you guessed it")
      this.setState({
        inputValue: '',
        color: colorRight,
        resultMessage: "Well Done, you guessed it!"
      })
      setTimeout(function() {this.nextTitle()}.bind(this), 2000);      
    } else {
      console.log("you wrote it wrong")
      this.setState({
        color: colorWrong,
        resultMessage: "That's wrong. Try again or skip to the next"
      })
    }
}


toggle() {
  this.setState({
    open: !this.state.open
  });
}

  render() {
    const {image,title,titleRomaji,resultMessage} = this.state;
    return ( 
    <section className="flex flex-column align-center justify-center">
    <h3>Can you guess this anime native title?</h3>
        <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
        <div className="flex flex-row align-center">
          {title && 
            ( < > 
              <button id="previous">
                <i className="fas fa-angle-left"></i>
              </button>
              < div className = "loader" style={{ borderColor: this.state.color }} >
                < div className = "gameImg" style = {image} > </div> 
              </div >  
              <button id="next" onClick = {this.nextTitle} >
                <i className="fas fa-angle-right"></i>
              </button>               
              </ > )} 
        </div>
        <div className="message" style={{color: this.state.color}}>{resultMessage}</div>
        <div className="flex flex-row wrap justify-center align-center">
          <button onClick={this.toggle.bind(this)}>Help</button>   
          <form className="flex flex-row wrap justify-center align-center">               
              <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
              <button onClick={(e) => this.compareTitles(e)}>Check</button>
          </form>     
        </div>
        <div className={"collapse" + (this.state.open ? ' in' : '')}>
            The title in romaji is <b>{titleRomaji}</b>
          </div>
    </section>
    )
  }
}

export default App;