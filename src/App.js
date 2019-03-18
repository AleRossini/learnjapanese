import React, { Component } from "react";
// import logo from './logo.svg';
import "./index.css";
import "./App.css";
import { query } from "./query.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      titleRomaji: "",
      image: {},
      inputValue: "",
      open: false,
      hasError: false
    };
    this.retryCount = 0;
    this.nextTitle = this.nextTitle.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleData = this.handleData.bind(this);
  }

  componentDidMount() {
    console.log("called");
    this.nextTitle();
  }

  async nextTitle() {
    var variables = {
      id: Math.floor(Math.random() * 9000) + 1
    };
    this.setState({
      open: false
    });
    var url = "https://graphql.anilist.co",
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          query: query,
          variables: variables
        })
      };
    try {
      const response = await fetch(url, options);
      const data = await this.handleResponse(response);
      this.handleData(data);
      this.retryCount = 0;
    } catch (e) {
      if (this.retryCount <= 5) {
        this.nextTitle();
        this.retryCount += 1;
      } else {
        // Display an error because we've tried a few times
        this.setState({ hasError: true });
        this.retryCount = 0; // maybe they start again manually so give them the 5 restarts
      }
    }
  }

  handleResponse(response) {
    return response.json().then(function(json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  handleData(data) {
    var media = data.data.Media;
    var title = data.data.Media.title.native;
    var titleRomaji = data.data.Media.title.romaji;
    var img = data.data.Media.coverImage.large;
    var isAdult = data.data.Media.isAdult;
    var fullEng = /^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/;

    console.log(media);

    if (title === null || media === null || isAdult || fullEng.test(title)) {
      this.nextTitle();
    }
    const newStyle = {
      backgroundImage: `url(${img})`
    };
    this.setState({
      title: title,
      image: newStyle,
      titleRomaji: titleRomaji
    });
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  compareTitles = e => {
    e.preventDefault();
    this.setState({
      inputValue: this.state.inputValue
    });
    const inputValue = this.state.inputValue;
    const titleNative = this.state.title;
    if (inputValue === titleNative) {
      console.log("you guessed it");
      this.setState({
        inputValue: ""
      });
      setTimeout(this.nextTitle(), 10000);
    } else {
      console.log("you wrote it wrong");
    }
  };

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const { image, title, titleRomaji, open } = this.state;
    console.log(open);
    console.log(title);
    return (
      <section class="flex flex-column align-center justify-center">
        <form>
          <input type="radio" name="Anime" value="Anime" /> Anime
          <input type="radio" name="Manga" value="Manga" /> Manga
        </form>
        <i class="fa fa-cog fa-spin fa-3x fa-fw" />
        <div class="flex flex-row align-center">
          {title && (
            <>
              <div class="loader">
                <div class="gameImg" style={image}>
                  {" "}
                </div>
              </div>
              <button onClick={this.nextTitle}>
                <i class="fas fa-angle-right" />
              </button>
            </>
          )}
        </div>
        <form class="flex flex-row">
          <input
            value={this.state.inputValue}
            onChange={evt => this.updateInputValue(evt)}
          />
          <button onClick={e => this.compareTitles(e)}>Check</button>
        </form>
        <div>
          <button onClick={this.toggle.bind(this)}>Need help?</button>
          <div className={"collapse" + (this.state.open ? " in" : "")}>
            The title in romaji is: {titleRomaji}
          </div>
        </div>
      </section>
    );
  }
}

export default App;
